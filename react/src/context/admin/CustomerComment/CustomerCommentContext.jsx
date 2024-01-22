import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

  const initCustomerComment = {
    data:[],
    comments:[],
    addCustomerCommentErrors:{},
    updateCustomerCommentErrors:{},
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "Initial_Customer_Comments":
        return {
          ...state, ...{data: action.payload.data_, comments: action.payload.comments_}
        };
      case "Add_Customer_Comment": 

        let error_keys = Object.keys(action.payload.errors); 
        if(error_keys.length > 0 )
        {

          return {...state, addCustomerCommentErrors: action.payload.errors};

        }else if( error_keys.length == 0 ){  

          return {
            ...state, ...{data: [...state.data, action.payload.data], addCustomerCommentErrors: {}}
          };

        }
      case "Update_Customer_Comment": 
        let update_error_keys = Object.keys(action.payload.errors); 
        if( update_error_keys.length > 0 )
        {
          return {...state, updateCustomerCommentErrors: action.payload.errors};

        }else if( update_error_keys.length == 0 && !action.payload.data ){ 

          return {...state, updateCustomerCommentErrors: {}};

        }else if( update_error_keys.length == 0 && action.payload.data ){ 

          return {
            ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updateCustomerCommentErrors: {}}
          };

        }
      case "Delete_Customer_Comment": 
        return {
          ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addCustomerCommentErrors: {},  updateCustomerCommentErrors:{} }
        };
      default:
        return state;
    }
  }

  const createCustomerCommentContext  = createContext( initCustomerComment );

  export const useCustomerCommentContext = () =>  useContext( createCustomerCommentContext );

const CustomerCommentContext = ( { children } ) => {

    const [state, dispatch] = useReducer(reducer, initCustomerComment)
    const [loading, setLoading]   = useState(false);
    const [refresh, setRefresh]   = useState(false);
    const [adding, setAdding]     = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const customerCommentInitRef = useRef(true);

    useEffect(() =>{ 
      if( customerCommentInitRef.current){
        getCustomerComments();
      }
      
      return () => {
        customerCommentInitRef.current == false; 
        setRefresh(false);
      };
    }, [refresh]);

    const getCustomerComments = async(link) => {
        setLoading(true); 
        let url = link ? link:'/admin/customer-comments'; 
        await axiosClient.get(url)
        .then(res =>{
            if(res && res.status == 200){
              setLoading(false);
              
              let { data } = res.data;
              if(data){
                  dispatch({ type:"Initial_Customer_Comments", payload: {data_: data.data, comments_: data} });
              }
            }    
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        })

    }

    const addCustomerComment = async(e, customerComment) => {
      e.preventDefault();
      setAdding(true);
      let customer_commentForm = new FormData();
      customer_commentForm.append('name', customerComment.name);
      customer_commentForm.append('job', customerComment.job);
      customer_commentForm.append('comment', customerComment.comment);
      customer_commentForm.append('image', customerComment.image);

      await axiosClient.post('/admin/customer-comments', customer_commentForm)
      .then(res => {
        setAdding(false);
        if(res.status == 201){
          toast.fire({
            icon: 'success',
            title: res.data.message,
          })
          dispatch({type: "Add_Customer_Comment", payload: {data: res.data.data, errors:{}}});
          if(!refresh){
            setRefresh(true);
            customerCommentInitRef.current = true;
          }
        } 
      })
      .catch(({response}) => { 
        setAdding(false);
        if(response){
          if(response.status == 422){
            console.log(response);
            toast.fire({
              icon: 'error',
              title: response.data.message,
            });
            dispatch({type: "Add_Customer_Comment", payload: {data: null, errors: response.data.errors}});
          }
        }
      })
    }

    const getCustomerComment = ( customer_comment_id ) => {
      if(customer_comment_id){
        let datas = state.data.filter(data => data.id == customer_comment_id);
        if(datas.length > 0){
          return datas[0];
        }
      }
    }

    const updateCustomerComment = async(e, customer_comment_id , customerComment) => {
      e.preventDefault();
      setUpdating(true);
        
      let customer_commentForm = new FormData();
      customer_commentForm.append('name', customerComment.name);
      customer_commentForm.append('job', customerComment.job);
      customer_commentForm.append('comment', customerComment.comment);
      customer_commentForm.append('image', customerComment.image);
      customer_commentForm.append('_method', 'put');

      await axiosClient.post(`/admin/customer-comments/${ customer_comment_id }`, customer_commentForm)
      .then(res => {
        setUpdating(false); 
        if(res.status == 202){
          toast.fire({
              icon: 'success',
              title: res.data.message,
          });
          dispatch({type: "Update_Customer_Comment", payload: {data: res.data.data, errors:{}}});
        }
      })
      .catch(({response}) => { 
          setUpdating(false);
          if(response){
            if(response.status == 422){
              toast.fire({
                icon: 'error',
                title: response.data.message,
              });
              dispatch({type: "Update_Customer_Comment", payload: {data: null, errors: response.data.errors}});
            }else if(response.status == 404){
                toast.fire({
                  icon: 'error',
                  title: response.data.error,
                });
                dispatch({type: "Update_Customer_Comment", payload: {data: res.data.data, errors: {}}});
            }          
          }
      })
      
    }

    const deleteCustomerComment = (e, customer_comment_id) => {
      e.preventDefault();
      setDeleting( customer_comment_id );
      customerCommentInitRef.current = true;
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
            axiosClient.delete(`/admin/customer-comments/${ customer_comment_id }`)
            .then(res =>{
              if(res && res.status == 204){
                dispatch({ type: "Delete_Customer_Comment", payload: customer_comment_id });
                toast.fire({
                  icon: 'warning',
                  title: 'Selected home was deleted',
                });
                setDeleting(false);
                if(!refresh){
                  setRefresh(true);
                  customerCommentInitRef.current = true;
                }        
              }
            })
            .catch(error => {
                if(error){
                  console.log(error);
                  setDeleting(false);
                }
            })
        }else{
          setDeleting(false);
        }
      }) 
    }

  return (
    <createCustomerCommentContext.Provider
      value={
        {
          customerComments: state.data, comments: state.comments, getCustomerComments, loading, deleteCustomerComment, deleting, 
          addCustomerCommentErrors:state.addCustomerCommentErrors , addCustomerComment, adding, refresh, setRefresh,
          getCustomerComment, updateCustomerComment, updating, updateCustomerCommentErrors: state.updateCustomerCommentErrors
        }
      }
    >
        { children }
    </createCustomerCommentContext.Provider>
  )
}

export default CustomerCommentContext