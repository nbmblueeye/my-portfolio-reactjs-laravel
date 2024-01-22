import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

  const initHome = {
    data:[],
    addHomeErrors:{},
    updateHomeErrors:{},
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "Initial_Homes":
        return {
          ...state, data: action.payload
        };
      case "Add_Home": 
        let error_keys = Object.keys(action.payload.errors); 
        if(error_keys.length > 0 )
        {
          return {...state, addHomeErrors: action.payload.errors};
        }else if( error_keys.length == 0 ){  
          return {
            ...state, ...{data: [...state.data, action.payload.data], addHomeErrors: {}}
          };
        }
      case "Update_Home": 
        let update_error_keys = Object.keys(action.payload.errors); 
        if( update_error_keys.length > 0 )
        {
          return {...state, updateHomeErrors: action.payload.errors};

        }else if( update_error_keys.length == 0 && !action.payload.data ){ 

          return {...state, updateHomeErrors: {}};

        }else if( update_error_keys.length == 0 && action.payload.data ){ 

          return {
            ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updateHomeErrors: {}}
          };

        }
      case "Delete_Home": 
        return {
          ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addHomeErrors: {},  updateHomeErrors:{} }
        };
      default:
          return state;
    }
  }

  const createHomeContext  = createContext(initHome);

  export const useHomeContext = () =>  useContext( createHomeContext );

const HomeContext = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initHome)
    const [loading, setLoading]   = useState(false);
    const [refresh, setRefresh]   = useState(false);
    const [adding, setAdding]     = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const homeInitRef = useRef(true);

    useEffect(() =>{
      if(homeInitRef.current){
        getHomes();
      }
      return () => {
        homeInitRef.current = false;
      }
    }, []);

    const getHomes = async() => {
      setLoading(true); 
      await axiosClient.get('/admin/homes')
      .then(res =>{
        if(res && res.status == 200){
          setLoading(false);
          let { data } = res.data;
          if(data){
            dispatch({ type:"Initial_Homes", payload: data });
          }
        }    
      })
      .catch(error => {
          setLoading(false);
          console.log(error);
      })
    }

    const addHome = async(e, home) => {
      e.preventDefault();
      setAdding(true);

      let homeForm = new FormData();
      homeForm.append('title', home.title);
      homeForm.append('sub_title', home.sub_title);
      homeForm.append('message', home.message);
      homeForm.append('image', home.image);
  
      homeForm.append('facebook_url', home.facebook_url);
      homeForm.append('linkedin_url', home.linkedin_url);
      homeForm.append('instagram_url', home.instagram_url);
      homeForm.append('youtube_url', home. youtube_url);
  
      homeForm.append('button_text', home.button_text);
      homeForm.append('button_url', home.button_url);
     
      await axiosClient.post('/admin/homes', homeForm)
      .then(res => {
        setAdding(false);
        if(res.status == 201){
          toast.fire({
            icon: 'success',
            title: res.data.message,
          })
          dispatch({type: "Add_Home", payload: {data: res.data.data, errors:{}}});
          setRefresh(true);
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
              dispatch({type: "Add_Home", payload: {data: null, errors: response.data.errors}});
            }
          }
      })
    }

    const getHome = ( home_id ) => {
      if(home_id){
        let datas = state.data.filter(data => data.id == home_id);
        if(datas.length > 0){
          return datas[0];
        }
      }
    }

    const updateHome = async(e, home_id , home) => {
      e.preventDefault();
      if( home_id ){
        setUpdating(true);
        let homeForm = new FormData();
        homeForm.append('title', home.title);
        homeForm.append('sub_title', home.sub_title);
        homeForm.append('message', home.message);
        homeForm.append('image', home.image);
    
        homeForm.append('facebook_url', home.facebook_url);
        homeForm.append('linkedin_url', home.linkedin_url);
        homeForm.append('instagram_url', home.instagram_url);
        homeForm.append('youtube_url', home. youtube_url);
    
        homeForm.append('button_text', home.button_text);
        homeForm.append('button_url', home.button_url);
        homeForm.append('_method', 'put');
    
        await axiosClient.post(`/admin/homes/${ home_id }`, homeForm)
        .then(res => {
          setUpdating(false); 
          if(res.status == 202){
            toast.fire({
                icon: 'success',
                title: res.data.message,
            });
            dispatch({type: "Update_Home", payload: {data: res.data.data, errors:{}}});
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
                dispatch({type: "Update_Home", payload: {data: null, errors: response.data.errors}});
              }else if(response.status == 404){
                  toast.fire({
                    icon: 'error',
                    title: response.data.error,
                  });
                  dispatch({type: "Update_Home", payload: {data: res.data.data, errors: {}}});
              }          
            }
        })
      }
    }

    const deleteHome = (e, home_id) => {
      e.preventDefault();
      setDeleting(home_id);
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
            axiosClient.delete(`/admin/homes/${home_id}`)
            .then(res =>{
              if(res && res.status == 204){
                dispatch({ type: "Delete_Home", payload: home_id });
                toast.fire({
                  icon: 'warning',
                  title: 'Selected home was deleted',
                });
                setDeleting(null);
              }
            })
            .catch(error => {
                if(error){
                  console.log(error);
                  setDeleting(null);
                }
            })
        }else{
          setDeleting(null);
        }
      }) 
    }

  return (
    <createHomeContext.Provider 
        value={{
        homes: state.data, loading, deleting, deleteHome,  
        addHomeErrors: state.addHomeErrors ,addHome, adding, refresh, setRefresh,
        getHome, updating, updateHome, updateHomeErrors: state.updateHomeErrors ,  
    }}>
        {children}
    </createHomeContext.Provider>
  )
}

export default HomeContext