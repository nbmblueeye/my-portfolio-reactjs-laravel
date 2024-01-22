import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

    const initServiceItem = {
    data:[],
    services: [],
    addServiceItemErrors:{},
    updateServiceItemErrors:{},
    }

    const reducer = (state, action) => {
        switch (action.type) {
        case "Initial_Service_Items":
            return {
            ...state, ...{data: action.payload.data_, services: action.payload.services_}
            };

        case "Add_Service_Item": 
            let error_keys = Object.keys(action.payload.errors); 
            if(error_keys.length > 0 )
            {
            return {...state, addServiceItemErrors: action.payload.errors};
            }else if( !action.payload.data){  
            return {...state, addServiceItemErrors: {}};
            }else if( action.payload.data ){  
            return {
                ...state, ...{data: [...state.data, action.payload.data], addServiceItemErrors: {}}
            };
            }

        case "Update_Service_Item": 

            let update_error_keys = Object.keys(action.payload.errors); 
            if( update_error_keys.length > 0 )
            {

            return {...state, updateServiceItemErrors: action.payload.errors};

            }else if( !action.payload.data ){ 

            return {...state, updateServiceItemErrors: {}};

            }else if( action.payload.data ){ 

            return {
                ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updateServiceItemErrors: {}}
            };

            }

        case "Delete_Service_Item": 
            return {
            ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addServiceItemErrors: {}, updateServiceItemErrors:{} }
            };

        default:
            return state;
        }
    }
    
    const createServiceItemContext  = createContext( initServiceItem );

    export const useServiceItemContext = () =>  useContext( createServiceItemContext );

const ServiceItemContext = ( {children} ) => {

    const [state, dispatch] = useReducer( reducer, initServiceItem );

    const [loading, setLoading]     = useState(false);
    const [refresh, setRefresh]     = useState(false);
    const [adding, setAdding]       = useState(false);
    const [updating, setUpdating]   = useState(false);
    const [deleting, setDeleting]   = useState(null);
    const serviceItemInitRef          = useRef(true);

    useEffect(() =>{
        if(serviceItemInitRef.current){
            getServiceItems();
        }
        return () => {
          serviceItemInitRef.current = false;
        }
    }, []);
    
    const getServiceItems = async() => {
        setLoading(true); 
        await axiosClient.get('/admin/service_items')
        .then(res =>{
            if(res && res.status == 200){
              setLoading(false);
              let { services, data } = res.data;         
              dispatch({ type:"Initial_Service_Items", payload: { data_:data, services_:services } });
            }    
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        })
    }

    const addServiceItem = async(e, service_item) => {
        e.preventDefault();
        setAdding(true);

        let service_itemForm = new FormData();
        service_itemForm.append('service_id', service_item.service_id);
        service_itemForm.append('title', service_item.title);
        service_itemForm.append('link', service_item.link);
        service_itemForm.append('description', service_item.description);
        service_itemForm.append('image', service_item.image);

        await axiosClient.post('/admin/service_items', service_itemForm)
        .then(res => {
          setAdding(false);
          if(res.status == 201){
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            dispatch({type: "Add_Service_Item", payload: {data: res.data.data, errors:{}}});
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
                    dispatch({type: "Add_Service_Item", payload: {data: null, errors: response.data.errors}});
                }else if(response.status == 404){
                    toast.fire({
                        icon: 'error',
                        title: response.data.error,
                    });
                    dispatch({type: "Add_Service_Item", payload: {data: response.data.data, errors: {}}});
                }
            }
        })
    }
  
    const getServiceItem = ( service_item_id ) => {
        if( service_item_id ){
          let datas = state.data.filter(data => data.id == service_item_id);
          if(datas.length > 0){
            return datas[0];
          }
        }
    }
    
    const updateServiceItem = async(e, service_item_id, service_item) => {
        e.preventDefault();
        setUpdating(true);

        let service_itemForm = new FormData();
        service_itemForm.append('service_id', service_item.service_id);
        service_itemForm.append('title', service_item.title);
        service_itemForm.append('link', service_item.link);
        service_itemForm.append('description', service_item.description);
        service_itemForm.append('image', service_item.image);
        service_itemForm.append('_method', 'put');

        await axiosClient.post(`/admin/service_items/${ service_item_id }`, service_itemForm)
        .then(res => {
            setUpdating(false);
            if(res.status == 202){
            toast.fire({
                icon: 'success',
                title: res.data.message,
            });
            dispatch({type: "Update_Service_Item", payload: {data: res.data.data, errors:{}}});
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
                dispatch({type: "Update_Service_Item", payload: {data: null, errors: response.data.errors}});
            }else if(response.status == 404){
                toast.fire({
                icon: 'error',
                title: response.data.error,
                })
                dispatch({type: "Update_Service_Item", payload: {data: res.data.data, errors: {}}});
            }
            }
        })
    }
  
    const deleteServiceItem = (e, service_item_id) => {
      e.preventDefault();
      setDeleting( service_item_id );
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
              axiosClient.delete(`/admin/service_items/${service_item_id}`)
              .then(res =>{
                  if(res && res.status == 204){
                    dispatch({ type: "Delete_Service_Item", payload: service_item_id });
                    toast.fire({
                      icon: 'warning',
                      title: 'Selected Skill Item was deleted',
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
    <createServiceItemContext.Provider
        value={
            {
                service_items: state.data, loading, deleteServiceItem, deleting, 
                addServiceItemErrors:state.addServiceItemErrors , addServiceItem, adding, refresh, setRefresh,
                services: state.services, getServiceItem, updateServiceItem, updating, updateServiceItemErrors: state.updateServiceItemErrors
            }
        }
    >
        {children}
    </createServiceItemContext.Provider>
  )
}

export default ServiceItemContext