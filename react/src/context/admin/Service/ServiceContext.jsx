import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

    const initService = {
        data:[],
        addServiceErrors:{},
        updateServiceErrors:{},
    }

    const reducer = (state, action) => {
        switch (action.type) {

            case "Initial_Services":
                return {
                ...state, data: action.payload
                };

            case "Add_Service": 

                let error_keys = Object.keys(action.payload.errors); 
                if(error_keys.length > 0 )
                {
                    return {...state, addServiceErrors: action.payload.errors};
                }else{  
                    return {
                        ...state, ...{data: [...state.data, action.payload.data], addServiceErrors: {}}
                    };
                }

            case "Update_Service": 
        
                let update_error_keys = Object.keys(action.payload.errors); 
                if( update_error_keys.length > 0 )
                {
                    return {...state, updateServiceErrors: action.payload.errors};
        
                }else if( !action.payload.data ){ 
        
                    return {...state, updateServiceErrors: {}};
        
                }else if( action.payload.data ){ 
        
                    return {
                        ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updateServiceErrors: {}}
                    };
        
                }

            case "Delete_Service": 

                return {
                    ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addServiceErrors: {},  updateServiceErrors:{} }
                };

            default:
                return state;
        }
    }
    
    const createServiceContext  = createContext(initService);
    
    export const useServiceContext = () =>  useContext( createServiceContext );

const ServiceContext = ( {children} ) => {

    const [state, dispatch] = useReducer(reducer, initService);

    const [loading, setLoading]   = useState(false);
    const [refresh, setRefresh]   = useState(false);
    const [adding, setAdding]     = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const serviceInitRef = useRef(true);

    useEffect(() =>{
        if(serviceInitRef.current){
          getServices();
        }
        return () => {
          serviceInitRef.current = false;
        }
    }, []);
    
    const getServices = async() => {
      setLoading(true); 
      await axiosClient.get('/admin/services')
      .then(res =>{
        if(res && res.status == 200){
          setLoading(false);
          let { data } = res.data;
          if(data){
            dispatch({ type:"Initial_Services", payload: data });
          }
        }    
      })
      .catch(error => {
          setLoading(false);
          console.log(error);
      })
    }

    const addService = async(e, service) => {
        e.preventDefault();
        setAdding(true);
       
        let serviceForm = new FormData();
        serviceForm.append('title', service.title);
        serviceForm.append('description', service.description);
        serviceForm.append('image', service.image);

        await axiosClient.post('/admin/services', serviceForm)
        .then(res => {
          setAdding(false);
          if(res.status == 201){
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            dispatch({type: "Add_Service", payload: {data: res.data.data, errors:{}}});
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
              dispatch({type: "Add_Service", payload: {data: null, errors: response.data.errors}});
            }
          }
        })
    }

    const getService = ( service_id ) => {
        if(service_id){
          let datas = state.data.filter(data => data.id == service_id);
          if(datas.length > 0){
            return datas[0];
          }
        }
      }
    
    const updateService = async(e, service_id, service) => {
      e.preventDefault();
      setUpdating(true);
  
      let serviceForm = new FormData();
      serviceForm.append('title', service.title);
      serviceForm.append('description', service.description);
      serviceForm.append('image', service.image);
      serviceForm.append('_method', 'put');

      await axiosClient.post(`/admin/services/${ service_id }`, serviceForm)
      .then(res => {
        setUpdating(false);
        if(res.status == 202){
          toast.fire({
              icon: 'success',
              title: res.data.message,
          });
          dispatch({type: "Update_Service", payload: {data: res.data.data, errors:{}}});
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
            dispatch({type: "Update_Service", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
            toast.fire({
              icon: 'error',
              title: response.data.error,
            })
            dispatch({type: "Update_Service", payload: {data: res.data.data, errors: {}}});
          }
          console.log(response);
        }
      })
    }
    
    const deleteService = (e, service_id) => {
        e.preventDefault();
        setDeleting(service_id);
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
                axiosClient.delete(`/admin/services/${service_id}`)
                .then(res =>{
                    if(res && res.status == 204){
                      dispatch({ type: "Delete_Service", payload: service_id });
                      toast.fire({
                        icon: 'warning',
                        title: 'Selected Service was deleted',
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
        <createServiceContext.Provider
          value={
              {
                  services: state.data, loading, deleteService, deleting, 
                  addServiceErrors:state.addServiceErrors , addService, adding, refresh, setRefresh,
                  getService, updateService, updating, updateServiceErrors: state.updateServiceErrors
              }
          }
        >
            {children}
        </createServiceContext.Provider>
    )
}

export default ServiceContext