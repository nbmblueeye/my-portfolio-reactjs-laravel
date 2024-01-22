import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

const initAboutItem = {
    data:[],
    abouts: [],
    addAboutItemErrors:{},
    updateAboutItemErrors:{},
  }
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "Initial_About_Items":
        return {
          ...state, ...{data: action.payload.data, abouts: action.payload.abouts}
        };

      case "Add_About_Item": 
        let error_keys = Object.keys(action.payload.errors); 
        if(error_keys.length > 0 )
        {
          return {...state, addAboutItemErrors: action.payload.errors};
        }else if( !action.payload.data){  
          return {...state, addAboutItemErrors: {}};
        }else if( action.payload.data ){  
          return {
            ...state, ...{data: [...state.data, action.payload.data], addAboutItemErrors: {}}
          };
        }

      case "Update_About_Item": 

        let update_error_keys = Object.keys(action.payload.errors); 
        if( update_error_keys.length > 0 )
        {

          return {...state, updateAboutItemErrors: action.payload.errors};

        }else if( !action.payload.data ){ 

          return {...state, updateAboutItemErrors: {}};

        }else if( action.payload.data ){ 

          return {
            ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updateAboutItemErrors: {}}
          };

        }

      case "Delete_About_Item": 
        return {
          ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addAboutItemErrors: {},  updateAboutItemErrors:{} }
        };

      default:
          return state;
    }
  }
  
  const createAboutItemContext  = createContext( initAboutItem );
  
  export const useAboutItemContext = () => useContext( createAboutItemContext );

const AboutItemContext = ( { children } ) => {

    const [state, dispatch] = useReducer( reducer, initAboutItem );

    const [loading, setLoading]     = useState(false);
    const [refresh, setRefresh]     = useState(false);
    const [adding, setAdding]       = useState(false);
    const [updating, setUpdating]   = useState(false);
    const [deleting, setDeleting]   = useState(null);
    const aboutItemInitRef          = useRef(true);

    useEffect(() =>{
        if(aboutItemInitRef.current){
          getAboutItems();
        }
        return () => {
            aboutItemInitRef.current = false;
        }
    }, []);
    
    const getAboutItems = async() => {
        setLoading(true); 
        await axiosClient.get('/admin/about-items')
        .then(res =>{
            if(res && res.status == 200){
              setLoading(false);
              let { abouts, data } = res.data;               
              dispatch({ type:"Initial_About_Items", payload: {data:data, abouts:abouts} });
            }    
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        })
    }


    const addAboutItem = async(e, aboutItem) => {
      e.preventDefault();
      setAdding(true);

      let aboutItemForm = new FormData();
      aboutItemForm.append('about_id', aboutItem.about_id);
      aboutItemForm.append('title', aboutItem.title);
      aboutItemForm.append('description', aboutItem.description);
      aboutItemForm.append('image', aboutItem.image);

      await axiosClient.post('/admin/about-items', aboutItemForm)
      .then(res => {
        setAdding(false);
        if(res.status == 201){
          toast.fire({
            icon: 'success',
            title: res.data.message,
          })
          dispatch({type: "Add_About_Item", payload: {data: res.data.data, errors:{}}});
          setRefresh(true);
        } 
      })
      .catch(({response}) => { 
        setAdding(false);
        console.log(response);
        if(response){
          if(response.status == 422){
            toast.fire({
              icon: 'error',
              title: response.data.message,
            });
            dispatch({type: "Add_About_Item", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
            toast.fire({
              icon: 'error',
              title: response.data.error,
            });
            dispatch({type: "Add_About_Item", payload: {data: response.data.data, errors: {}}});
          }
        }
      })
    }

    const getAboutItem = ( aboutitem_id ) => {
      if(aboutitem_id){
        let datas = state.data.filter(data => data.id == aboutitem_id);
        if(datas.length > 0){
          return datas[0];
        }
      }
    }
  
    const updateAboutItem = async(e, aboutitem_id, aboutItem) => {
      e.preventDefault();
      setUpdating(true);
  
      let aboutItemForm = new FormData();
      aboutItemForm.append('about_id', aboutItem.about_id);
      aboutItemForm.append('title', aboutItem.title);
      aboutItemForm.append('description', aboutItem.description);
      aboutItemForm.append('image', aboutItem.image);
      aboutItemForm.append('_method', 'put');

      await axiosClient.post(`/admin/about-items/${aboutitem_id}`, aboutItemForm)
      .then(res => {
        setUpdating(false);
        if(res.status == 202){
          toast.fire({
            icon: 'success',
            title: res.data.message,
          });
          dispatch({type: "Update_About_Item", payload: {data: res.data.data, errors:{}}});
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
            dispatch({type: "Update_About_Item", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
            toast.fire({
              icon: 'error',
              title: response.data.error,
            })
            dispatch({type: "Update_About_Item", payload: {data: res.data.data, errors: {}}});
          }
        }
      })
    }

    const deleteAboutItem = (e, aboutItem_id) => {
      e.preventDefault();
      setDeleting(aboutItem_id);
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
              axiosClient.delete(`/admin/about-items/${aboutItem_id}`)
              .then(res =>{
                  if(res && res.status == 204){
                    dispatch({ type: "Delete_About_Item", payload: aboutItem_id });
                    toast.fire({
                      icon: 'warning',
                      title: 'Selected About Item was deleted',
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
    <createAboutItemContext.Provider
        value={
            {
              aboutItems: state.data, loading, 
              deleteAboutItem, deleting, 
              addAboutItemErrors:state.addAboutItemErrors , addAboutItem, adding, refresh, setRefresh,
              abouts: state.abouts, getAboutItem, updateAboutItem, updating, updateAboutItemErrors: state.updateAboutItemErrors
            }
        }
    >
      { children }
    </createAboutItemContext.Provider>
  )
}

export default AboutItemContext