import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

  const initRole = {
    data:[],
    addRoleErrors:{},
    updateRoleErrors:{},
  }

  const reducer = (state, action) => {
      switch (action.type) {

        case "Initial_Roles":
          return {
            ...state, data: action.payload
          };

        case "Add_Role": 

          let error_keys = Object.keys(action.payload.errors); 
          if(error_keys.length > 0 )
          {
            return {...state, addRoleErrors: action.payload.errors};
          }else{  
            return {
              ...state, ...{data: [...state.data, action.payload.data], addRoleErrors: {}}
            };
          }

        case "Update_Role": 
    
          let update_error_keys = Object.keys(action.payload.errors); 
          if( update_error_keys.length > 0 )
          {
            return {...state, updateRoleErrors: action.payload.errors};
    
          }else if( !action.payload.data ){ 
    
            return {...state, updateRoleErrors: {}};
    
          }else if( action.payload.data ){ 
    
            return {
              ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updateRoleErrors: {}}
            };
    
          }

        case "Delete_Role": 

          return {
            ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addRoleErrors: {},  updateRoleErrors:{} }
          };

        default:
            return state;
      }
  }
    
  const createRoleContext  = createContext(initRole);
    
  export const useRoleContext = () =>  useContext( createRoleContext );

const AdminRoleContext = ( {children} ) => {

    const [state, dispatch] = useReducer(reducer, initRole);

    const [loading, setLoading]   = useState(false);
    const [refresh, setRefresh]   = useState(false);
    const [adding, setAdding]     = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const roleInitRef             = useRef(true);

    useEffect(() =>{
        if(roleInitRef.current){
          getRoles();
        }
        return () => {
           roleInitRef.current = false;
        }
    }, []);
    
    const getRoles = async() => {
      setLoading(true); 
      await axiosClient.get('/admin/roles')
      .then(res =>{
        if(res && res.status == 200){
          setLoading(false);
          let { data } = res.data;
          if(data){
            dispatch({ type:"Initial_Roles", payload: data });
          }
        }    
      })
      .catch(error => {
          setLoading(false);
          console.log(error);
      })
    }

    const addRole = async(e, role) => {
        e.preventDefault();
        setAdding(true);
       
        let roleForm = new FormData();
        roleForm.append('name', role.name);

        await axiosClient.post('/admin/roles', roleForm)
        .then(res => {
          setAdding(false);
          if(res.status == 201){
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            dispatch({type: "Add_Role", payload: {data: res.data.data, errors:{}}});
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
              dispatch({type: "Add_Role", payload: {data: null, errors: response.data.errors}});
            }
          }
        })
    }

    const getRole = ( role_id ) => {
        if(role_id){
          let datas = state.data.filter(data => data.id == role_id);
          if(datas.length > 0){
            return datas[0];
          }
        }
      }
    
    const updateRole = async(e, role_id, role) => {
      e.preventDefault();
      setUpdating(true);
  
      let roleForm = new FormData();
      roleForm.append('name', role.name);
      roleForm.append('_method', 'put');

      await axiosClient.post(`/admin/roles/${role_id}`, roleForm)
      .then(res => {
        setUpdating(false);
        if(res.status == 202){
          toast.fire({
              icon: 'success',
              title: res.data.message,
          });
          dispatch({type: "Update_Role", payload: {data: res.data.data, errors:{}}});
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
            dispatch({type: "Update_Role", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
            toast.fire({
              icon: 'error',
              title: response.data.error,
            })
            dispatch({type: "Update_Role", payload: {data: res.data.data, errors: {}}});
          }
          console.log(response);
        }
      })
    }
    
    const deleteRole = (e, role_id) => {
        e.preventDefault();
        setDeleting(role_id);
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
                axiosClient.delete(`/admin/roles/${role_id}`)
                .then(res =>{
                    if(res && res.status == 204){
                      dispatch({ type: "Delete_Role", payload: role_id });
                      toast.fire({
                        icon: 'warning',
                        title: 'Selected Role was deleted',
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
    <createRoleContext.Provider
      value={
        {
          roles: state.data, loading, deleteRole, deleting, 
          addRoleErrors:state.addRoleErrors , addRole, adding, refresh, setRefresh,
          getRole, updateRole, updating, updateRoleErrors: state.updateRoleErrors
        }
      }
    >
        {children}
    </createRoleContext.Provider>
  )
}

export default AdminRoleContext