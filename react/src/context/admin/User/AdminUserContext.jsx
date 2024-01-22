import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

  const initUserItem = {
    data:[],
    roles: [],
    addUserErrors:{},
    updateUserErrors:{},
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "Initial_Users":
        return {
          ...state, ...{data: action.payload.data_, roles: action.payload.roles_}
        };

      case "Add_User": 
        let error_keys = Object.keys(action.payload.errors); 
        if(error_keys.length > 0 )
        {
          return {...state, addUserErrors: action.payload.errors};
        }else if( !action.payload.data){  
          return {...state, addUserErrors: {}};
        }else if( action.payload.data ){  
          return {
            ...state, ...{data: [...state.data, action.payload.data], addUserErrors: {}}
          };
        }

      case "Update_User": 

        let update_error_keys = Object.keys(action.payload.errors); 
        if( update_error_keys.length > 0 )
        {

          return {...state, updateUserErrors: action.payload.errors};

        }else if( !action.payload.data ){ 

          return {...state, updateUserErrors: {}};

        }else if( action.payload.data ){ 

          return {
            ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updateUserErrors: {}}
          };

        }

      case "Delete_User": 
        return {
          ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addUserErrors: {}, updateUserErrors:{} }
        };

      default:
          return state;
    }
  }
  
  const createUserContext  = createContext( initUserItem );
    
  export const useUserContext = () =>  useContext( createUserContext );

const AdminUserContext = ( {children} ) => {

    const [state, dispatch] = useReducer( reducer, initUserItem );

    const [loading, setLoading]     = useState(false);
    const [refresh, setRefresh]     = useState(false);
    const [adding, setAdding]       = useState(false);
    const [updating, setUpdating]   = useState(false);
    const [deleting, setDeleting]   = useState(null);
    const userInitRef               = useRef(true);

    useEffect(() =>{
        if(userInitRef.current){
            getUsers();
        }
        return () => {
          userInitRef.current = false;
        }
    }, []);
    
    const getUsers = async() => {
        setLoading(true); 
        await axiosClient.get('/admin/users')
        .then(res =>{
            if(res && res.status == 200){
              setLoading(false);
              let { roles, data } = res.data;        
              dispatch({ type:"Initial_Users", payload: {data_: data, roles_:roles } });
            }    
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        })
    }

    const addUser = async(e, user) => {
      e.preventDefault();
      setAdding(true);

      let userForm = new FormData();
      userForm.append('name', user.name);
      userForm.append('email', user.email);
      userForm.append('user_role', user.user_role);
      userForm.append('password', user.password);
      
      await axiosClient.post('/admin/users', userForm)
      .then(res => {
        setAdding(false);
        if(res.status == 201){
          toast.fire({
            icon: 'success',
            title: res.data.message,
          })
          dispatch({type: "Add_User", payload: {data: res.data.data, errors:{}}});
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
            dispatch({type: "Add_User", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
            toast.fire({
              icon: 'error',
              title: response.data.error,
            });
            dispatch({type: "Add_User", payload: {data: response.data.data, errors: {}}});
          }
        }
      })
    }
  
    const getUser = ( user_id ) => {
      if( user_id ){
        let datas = state.data.filter(data => data.id == user_id);
        if(datas.length > 0){
          return datas[0];
        }
      }
    }
    
    const updateUser = async(e, user_id, user) => {
      e.preventDefault();
      setUpdating(true);

      let userForm = new FormData();
      userForm.append('name', user.name);
      userForm.append('email', user.email);
      userForm.append('user_role', user.user_role);
      userForm.append('password', user.password);
      userForm.append('_method', 'put');

      await axiosClient.post(`/admin/users/${ user_id }`, userForm)
      .then(res => {
          setUpdating(false);
          if(res.status == 202){
            toast.fire({
                icon: 'success',
                title: res.data.message,
            });
            dispatch({type: "Update_User", payload: {data: res.data.data, errors:{}}});
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
              dispatch({type: "Update_User", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
              toast.fire({
              icon: 'error',
              title: response.data.error,
              })
              dispatch({type: "Update_User", payload: {data: res.data.data, errors: {}}});
          }
          }
      })
    }
  
    const deleteUser = (e, user_id) => {
      e.preventDefault();
      setDeleting(user_id);
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
              axiosClient.delete(`/admin/users/${user_id}`)
              .then(res =>{
                  if(res && res.status == 204){
                    dispatch({ type: "Delete_User", payload: user_id });
                    toast.fire({
                      icon: 'warning',
                      title: 'Selected User was deleted',
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
    <createUserContext.Provider
      value={
        {
          users: state.data, roles: state.roles ,loading, deleteUser, deleting, 
          addUserErrors: state.addUserErrors , addUser, adding, refresh, setRefresh,
          getUser, updateUser, updating,  updateUserErrors: state.updateUserErrors
        }
      }
    >
      {children}
    </createUserContext.Provider>
  )
}

export default AdminUserContext