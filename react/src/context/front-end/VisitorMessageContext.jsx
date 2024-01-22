import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../axiosClient';

const initVisitorMessage = {
  data:[],
  message:[],
  errors:{},
  unreadNotification:[],
}

const reducer = (state, action) => {
  switch (action.type) {
    case "Initial_VisitorMessages":
      return {
        ...state, ...{data: action.payload.data_, message: action.payload.message_, unreadNotification: action.payload.unread_}
      };
    case "Add_VisitorMessage": 
      let error_keys = Object.keys(action.payload.errors_); 
      if(error_keys.length > 0 )
      {
        return {...state, errors: action.payload.errors_};
      }else{  
        return {
          ...state, ...{message: [...state.message, action.payload.data_], errors: action.payload.errors_}
        };
    }
    case "Update_VisitorMessage": 
    
    if( action.payload.data_ ){ 

        return {
          ...state, ...{message: state.message.map( item => item.id == action.payload.data_.id ? {...item, ...action.payload.data_}:item), 
          unreadNotification: state.unreadNotification.filter(item => item.id != action.payload.data_.id),
          errors: action.payload.errors_}
        };

      }

    case "Delete_VisitorMessage": 
      if(action.payload){
        return {
          ...state, ...{ message: state.message.filter(item => item.id != action.payload ), 
            unreadNotification: state.unreadNotification.filter(item => item.id != action.payload),
            errors: action.payload.errors_}
        };
      }
     
    default:
        return state;
  }
}

const createVisitorMessageContext  = createContext(initVisitorMessage);

export const useVisitorMessageContext = () =>  useContext(createVisitorMessageContext);

const VisitorMessageContext = ( {children} ) => {

  const [state, dispatch] = useReducer(reducer, initVisitorMessage)

  const [loading, setLoading]   = useState(false);
  const [refresh, setRefresh]   = useState(false);
  const [adding, setAdding]     = useState(false);
  const [updating, setUpdating] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [feedback, setFeedback] = useState({message:"", error:""});

  useEffect(() =>{
    getVisitorMessages();
    return () => {
      setRefresh(false);
    }
  }, [refresh]);

  const getVisitorMessages = async(link) => {
    setLoading(true);
    let url = link ? link:'/admin/visitor/messages';  
    await axiosClient.get(url)
    .then(res =>{
      if(res && res.status == 200){
        setLoading(false);
        let { data, unread } = res.data;
        if(data){
          dispatch({ type:"Initial_VisitorMessages", payload: {data_: data, message_: data.data, unread_: unread} });
        }
      }    
    })
    .catch(error => {
        setLoading(false);
        console.log(error);
    })
  } 

  const addVisitorMessage = async(e, message) => {
    e.preventDefault();
    setAdding(true);

    let visitorMessageForm = new FormData();
    visitorMessageForm.append('messageTitle', message.messageTitle);
    visitorMessageForm.append('message', message.message);
    
    await axiosClient.post('/front-end/visitor/message', visitorMessageForm)
    .then(res => {
      setAdding(false);
      if(res.status == 201){
        dispatch({type: "Add_VisitorMessage", payload: {data_: null, errors_:{}}});
        setRefresh(true);
        setFeedback({...feedback, message:res.data.message});
        setTimeout(() => {
          setFeedback({message:"", error:""});
        }, 3000);
      } 
    })
    .catch(({response}) => { 
      setAdding(false);
      if(response){
        if(response.status == 422){
          setTimeout(() => {
            setFeedback({message:"", error:""});
          }, 3000);
          dispatch({type: "Add_VisitorMessage", payload: {data: null, errors_: response.data.errors}});
        }else if(response.status == 401){
          setFeedback({...feedback, ...{message:"", error:"Please login to leave your message!"}});
          setTimeout(() => {
            setFeedback({message:"", error:""});
          }, 3000);
          dispatch({type: "Add_VisitorMessage", payload: {data: null, errors_: {}}});
        }else if(response.status == 403){
          setFeedback({...feedback, ...{message:"", error:response.data.error}});
          setTimeout(() => {
            setFeedback({message:"", error:""});
          }, 3000);
          dispatch({type: "Add_VisitorMessage", payload: {data: null, errors_: {}}});
        }
      }
    })
  }

  const markAsReadMessage = async(e, user_id, mess_id) => {
    e.preventDefault();
    if( user_id && mess_id){
      setUpdating(mess_id);
      let messageForm = new FormData();
      messageForm.append('user_id',user_id);
      messageForm.append('_method', 'put');

      await axiosClient.post(`/notification/${ mess_id }`, messageForm)
      .then(res => {
        setUpdating(null); 
        if(res.status == 202){
          toast.fire({
            icon: 'success',
            title: res.data.message,
          });
          dispatch({type: "Update_VisitorMessage", payload: {data_: res.data.data, errors_:{}}});
        }
      })
      .catch(({response}) => { 
        setUpdating(null);
        console.log(response);      
          
      })
    }
  }

  const deleteMessage = (e, user_id, mess_id) => {
    e.preventDefault();
    if( user_id && mess_id){
      setDeleting(mess_id);
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
              e.preventDefault();
              axiosClient.delete(`/notification/${ user_id }/${ mess_id }`)
              .then(res =>{
                  if(res && res.status == 204){
                    dispatch({ type: "Delete_VisitorMessage", payload: mess_id });
                    toast.fire({
                      icon: 'warning',
                      title: 'Selected Message is deleted',
                    });
                    setDeleting(null);
                  }
              })
              .catch(error => {
                if(error){
                  setDeleting(null);
                  console.log(error);
                }
              })
          }else{
            setDeleting(null);
          }
      }) 
    }   
}


  return (
    <createVisitorMessageContext.Provider
        value={
            {
              messages_: state.message, data: state.data, loading, getVisitorMessages,
              errors:state.errors, addVisitorMessage , adding, feedback, refresh, setRefresh,
              unreadNotification: state.unreadNotification, updating, markAsReadMessage,
              deleting, deleteMessage
            }
        }
    >
      {children}
    </createVisitorMessageContext.Provider>
  )
}

export default VisitorMessageContext
