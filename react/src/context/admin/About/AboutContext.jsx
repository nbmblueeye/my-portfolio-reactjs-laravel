import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

const initAbout = {
  data:[],
  addAboutErrors:{},
  updateAboutErrors:{},
}

const reducer = (state, action) => {
  switch (action.type) {
    case "Initial_Abouts":
      return {
        ...state, data: action.payload
      };
    case "Add_About": 
      let error_keys = Object.keys(action.payload.errors); 
      if(error_keys.length > 0 )
      {
        return {...state, addAboutErrors: action.payload.errors};
      }else{  
        return {
          ...state, ...{data: [...state.data, action.payload.data], addAboutErrors: {}}
        };
      }
    case "Update_About": 

      let update_error_keys = Object.keys(action.payload.errors); 
      if( update_error_keys.length > 0 )
      {
        return {...state, updateAboutErrors: action.payload.errors};

      }else if( !action.payload.data ){ 

        return {...state, updateAboutErrors: {}};

      }else if( action.payload.data ){ 

        return {
          ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updateAboutErrors: {}}
        };

      }
    case "Delete_About": 
      return {
        ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addAboutErrors: {},  updateAboutErrors:{} }
      };
    default:
        return state;
  }
}

const createAboutContext  = createContext(initAbout);

export const useAboutContext = () =>  useContext(createAboutContext );

const AboutContext = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initAbout)
  const [loading, setLoading]   = useState(false);
  const [refresh, setRefresh]   = useState(false);
  const [adding, setAdding]     = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const aboutInitRef = useRef(true);

  useEffect(() =>{
    if(aboutInitRef.current){
      getAbouts();
    }
    return () => {
      aboutInitRef.current = false;
    }
  }, []);

  const getAbouts = async() => {
    setLoading(true); 
    await axiosClient.get('/admin/abouts')
    .then(res =>{
      if(res && res.status == 200){
        setLoading(false);
        let { data } = res.data;
        if(data){
          dispatch({ type:"Initial_Abouts", payload: data });
        }
      }    
    })
    .catch(error => {
        setLoading(false);
        console.log(error);
    })
  }

  const addAbout = async(e, about) => {
    e.preventDefault();
    setAdding(true);
    let aboutForm = new FormData();
    aboutForm.append('title', about.title);
    aboutForm.append('sub_title', about.sub_title);
    aboutForm.append('introduction', about.introduction);
    aboutForm.append('image', about.image);
    await axiosClient.post('/admin/abouts', aboutForm)
    .then(res => {
      setAdding(false);
      if(res.status == 201){
        toast.fire({
          icon: 'success',
          title: res.data.message,
        })
        dispatch({type: "Add_About", payload: {data: res.data.data, errors:{}}});
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
          dispatch({type: "Add_About", payload: {data: null, errors: response.data.errors}});
        }
      }
    })
  }

  const getAbout = ( about_id ) => {
    if(about_id){
      let datas = state.data.filter(data => data.id == about_id);
      if(datas.length > 0){
        return datas[0];
      }
    }
  }

  const updateAbout = async(e, about_id, about) => {
    e.preventDefault();
    setUpdating(true);

    let aboutForm = new FormData();
    aboutForm.append('title', about.title);
    aboutForm.append('sub_title', about.sub_title);
    aboutForm.append('introduction', about.introduction);
    aboutForm.append('image', about.image);
    aboutForm.append('_method', 'put');

    await axiosClient.post(`/admin/abouts/${about_id}`, aboutForm)
    .then(res => {
      setUpdating(false);
      if(res.status == 202){
        toast.fire({
            icon: 'success',
            title: res.data.message,
        });
        dispatch({type: "Update_About", payload: {data: res.data.data, errors:{}}});
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
          dispatch({type: "Update_About", payload: {data: null, errors: response.data.errors}});
        }else if(response.status == 404){
          toast.fire({
            icon: 'error',
            title: response.data.error,
          })
          dispatch({type: "Update_About", payload: {data: res.data.data, errors: {}}});
        }
        console.log(response);
      }
    })
  }

  const deleteAbout = (e, about_id) => {
    e.preventDefault();
    setDeleting(about_id);
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
            axiosClient.delete(`/admin/abouts/${about_id}`)
            .then(res =>{
                if(res && res.status == 204){
                  dispatch({ type: "Delete_About", payload: about_id });
                  toast.fire({
                    icon: 'warning',
                    title: 'Selected About was deleted',
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
    <createAboutContext.Provider 
    value={
        {
          abouts: state.data, loading, 
          deleteAbout, deleting, 
          addAboutErrors:state.addAboutErrors , addAbout, adding, refresh, setRefresh,
          getAbout, updateAbout, updating, updateAboutErrors: state.updateAboutErrors
        }
      }
    >
      { children }
    </createAboutContext.Provider>
  )
}

export default AboutContext