import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

const initQualificationItem = {
  data:[],
  qualifications: [],
  addQualificationItemErrors:{},
  updateQualificationItemErrors:{},
}

const reducer = (state, action) => {
    switch (action.type) {
      case "Initial_Qualification_Items":
        return {
          ...state, ...{ data: action.payload.data, qualifications: action.payload.qualifications_ }
        };

      case "Add_Qualification_Item": 
        let error_keys = Object.keys(action.payload.errors); 
        if(error_keys.length > 0 )
        {
          return {...state, addQualificationItemErrors: action.payload.errors};
        }else if( !action.payload.data){  
          return {...state, addQualificationItemErrors: {}};
        }else if( action.payload.data ){  
          return {
            ...state, ...{data: [...state.data, action.payload.data], addQualificationItemErrors: {}}
          };
        }

      case "Update_Qualification_Item": 

        let update_error_keys = Object.keys(action.payload.errors); 
        if( update_error_keys.length > 0 )
        {

          return {...state,  updateQualificationItemErrors: action.payload.errors};

        }else if( !action.payload.data ){ 

          return {...state,  updateQualificationItemErrors: {}};

        }else if( action.payload.data ){ 

          return {
            ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item),  updateQualificationItemErrors: {}}
          };

        }

      case "Delete_Qualification_Item": 
        return {
          ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addQualificationItemErrors: {},  updateQualificationItemErrors:{} }
        };

      default:
          return state;
    }
  }
  
const createQualificationItemContext  = createContext( initQualificationItem );
  
export const useQualificationItemContext = () =>  useContext( createQualificationItemContext );

const QualificationItemContext = ( {children} ) => {

    const [state, dispatch] = useReducer( reducer, initQualificationItem );

    const [loading, setLoading]     = useState(false);
    const [refresh, setRefresh]     = useState(false);
    const [adding, setAdding]       = useState(false);
    const [updating, setUpdating]   = useState(false);
    const [deleting, setDeleting]   = useState(null);
    const qualificationItemInitRef          = useRef(true);

    useEffect(() =>{
        if(qualificationItemInitRef.current){
          getQualificationItems();
        }
        return () => {
          qualificationItemInitRef.current = false;
        }
    }, []);
    
    const getQualificationItems = async() => {
        setLoading(true); 
        await axiosClient.get('/admin/qualification_items')
        .then(res =>{
            if(res && res.status == 200){
              setLoading(false);
              let { qualifications, data } = res.data;         
              dispatch({ type:"Initial_Qualification_Items", payload: {data:data, qualifications_:qualifications} });
            }    
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        })
    }

    const addQualificationItem = async(e, qualification_item) => {
        e.preventDefault();
        setAdding(true);

        let qualificationItemForm = new FormData();
        qualificationItemForm.append('qualification_id', qualification_item.qualification_id);
        qualificationItemForm.append('title', qualification_item.title);
        qualificationItemForm.append('description', qualification_item.description);
        qualificationItemForm.append('image', qualification_item.image);

        await axiosClient.post('/admin/qualification_items', qualificationItemForm)
        .then(res => {
          setAdding(false);
          if(res.status == 201){
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            dispatch({type: "Add_Qualification_Item", payload: {data: res.data.data, errors:{}}});
            setRefresh(true);
          } 
        })
        .catch(({response}) => { 
          setAdding(false);
          if(response){
            if(response.status == 422){
              toast.fire({
                icon: 'error',
                title: response.data.message,
              });
              dispatch({type: "Add_Qualification_Item", payload: {data: null, errors: response.data.errors}});
            }else if(response.status == 404){
              toast.fire({
                icon: 'error',
                title: response.data.error,
              });
              dispatch({type: "Add_Qualification_Item", payload: {data: response.data.data, errors: {}}});
            }
          }
        })
    }

    const getQualificationItem = ( qualification_item_id ) => {
        if( qualification_item_id ){
          let datas = state.data.filter(data => data.id == qualification_item_id);
          if(datas.length > 0){
            return datas[0];
          }
        }
      }
    
    const updateQualificationItem = async(e, qualification_item_id, qualification_item) => {
        e.preventDefault();
        setUpdating(true);
    
        let qualificationItemForm = new FormData();
        qualificationItemForm.append('qualification_id', qualification_item.qualification_id);
        qualificationItemForm.append('title', qualification_item.title);
        qualificationItemForm.append('description', qualification_item.description);
        qualificationItemForm.append('image', qualification_item.image);
        qualificationItemForm.append('_method', 'put');
        await axiosClient.post(`/admin/qualification_items/${qualification_item_id}`, qualificationItemForm)
        .then(res => {
            setUpdating(false);
            if(res.status == 202){
            toast.fire({
                icon: 'success',
                title: res.data.message,
            });
            dispatch({type: "Update_Qualification_Item", payload: {data: res.data.data, errors:{}}});
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
                  dispatch({type: "Update_Qualification_Item", payload: {data: null, errors: response.data.errors}});
              }else if(response.status == 404){
                  toast.fire({
                    icon: 'error',
                    title: response.data.error,
                  })
                  dispatch({type: "Update_Qualification_Item", payload: {data: res.data.data, errors: {}}});
              }
          }
        })
    }
  
    const deleteQualificationItem = (e, qualification_item_id) => {
        e.preventDefault();
        setDeleting(qualification_item_id);
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
                axiosClient.delete(`/admin/qualification_items/${qualification_item_id}`)
                .then(res =>{
                    if(res && res.status == 204){
                      dispatch({ type: "Delete_Qualification_Item", payload: qualification_item_id });
                      toast.fire({
                        icon: 'warning',
                        title: 'Selected Qualification Item was deleted',
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

  return (
    <createQualificationItemContext.Provider
      value={
        {
          qualification_items: state.data, loading, deleteQualificationItem, deleting, 
          addQualificationItemErrors:state.addQualificationItemErrors , addQualificationItem , adding, refresh, setRefresh,
          qualifications: state.qualifications, getQualificationItem, updateQualificationItem, updating, updateQualificationItemErrors: state.updateQualificationItemErrors
        }
      }
    >
      {children}
    </createQualificationItemContext.Provider>
  )
}

export default QualificationItemContext
