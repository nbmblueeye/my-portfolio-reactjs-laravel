import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

  const initQualification = {
    data:[],
    addQualificationErrors:{},
    updateQualificationErrors:{},
  }

  const reducer = (state, action) => {
      switch (action.type) {

        case "Initial_Qualifications":
          return {
            ...state, data: action.payload
          };

        case "Add_Qualification": 

          let error_keys = Object.keys(action.payload.errors); 
          if(error_keys.length > 0 )
          {
            return {...state, addQualificationErrors: action.payload.errors};
          }else{  
            return {
              ...state, ...{data: [...state.data, action.payload.data], addQualificationErrors: {}}
            };
          }

        case "Update_Qualification": 
    
          let update_error_keys = Object.keys(action.payload.errors); 
          if( update_error_keys.length > 0 )
          {
            return {...state, updateQualificationErrors: action.payload.errors};
    
          }else if( !action.payload.data ){ 
    
            return {...state, updateQualificationErrors: {}};
    
          }else if( action.payload.data ){ 
    
            return {
              ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updateQualificationErrors: {}}
            };
    
          }

        case "Delete_Qualification": 

          return {
            ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addQualificationErrors: {},  updateQualificationErrors:{} }
          };

        default:
            return state;
      }
  }
    
  const createQualificationContext  = createContext( initQualification );
    
  export const useQualificationContext = () =>  useContext( createQualificationContext );

const QualificationContext = ( {children} ) => {

    const [state, dispatch] = useReducer(reducer, initQualification);

    const [loading, setLoading]   = useState(false);
    const [refresh, setRefresh]   = useState(false);
    const [adding, setAdding]     = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const qualificationInitRef = useRef(true);

    useEffect(() =>{
        if(qualificationInitRef.current){
            getQualifications();
        }
        return () => {
            qualificationInitRef.current = false;
        }
    }, []);
    
    const getQualifications = async() => {
      setLoading(true); 
      await axiosClient.get('/admin/qualifications')
      .then(res =>{
        if(res && res.status == 200){
          setLoading(false);
          let { data } = res.data;
          if(data){
            dispatch({ type:"Initial_Qualifications", payload: data });
          }
        }    
      })
      .catch(error => {
          setLoading(false);
          console.log(error);
      })
    }

    const addQualification = async(e, qualification) => {
        e.preventDefault();
        setAdding(true);
       
        let qualificationForm = new FormData();
        qualificationForm.append('title', qualification.title);
        qualificationForm.append('description', qualification.description);
        qualificationForm.append('image', qualification.image);

        await axiosClient.post('/admin/qualifications', qualificationForm)
        .then(res => {
          setAdding(false);
          if(res.status == 201){
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            dispatch({type: "Add_Qualification", payload: {data: res.data.data, errors:{}}});
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
              dispatch({type: "Add_Qualification", payload: {data: null, errors: response.data.errors}});
            }
          }
        })
    }

    const getQualification = ( qualification_id  ) => {
        if( qualification_id ){
          let datas = state.data.filter(data => data.id == qualification_id );
          if(datas.length > 0){
            return datas[0];
          }
        }
      }
    
    const updateQualification = async(e, qualification_id, qualification) => {
      e.preventDefault();
      setUpdating(true);
  
      let qualificationForm = new FormData();
      qualificationForm.append('title', qualification.title);
      qualificationForm.append('description', qualification.description);
      qualificationForm.append('image', qualification.image);
      qualificationForm.append('_method', 'put');
      await axiosClient.post(`/admin/qualifications/${ qualification_id }`, qualificationForm)
      .then(res => {
        setUpdating(false);
        if(res.status == 202){
          toast.fire({
              icon: 'success',
              title: res.data.message,
          });
          dispatch({type: "Update_Qualification", payload: {data: res.data.data, errors:{}}});
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
            dispatch({type: "Update_Qualification", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
            toast.fire({
              icon: 'error',
              title: response.data.error,
            })
            dispatch({type: "Update_Qualification", payload: {data: res.data.data, errors: {}}});
          }
          console.log(response);
        }
      })
    }
    
    const deleteQualification = (e, qualification_id) => {
        e.preventDefault();
        setDeleting(qualification_id);
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
                axiosClient.delete(`/admin/qualifications/${qualification_id}`)
                .then(res =>{
                    if(res && res.status == 204){
                      dispatch({ type: "Delete_Qualification", payload: qualification_id });
                      toast.fire({
                        icon: 'warning',
                        title: 'Selected Qualification was deleted',
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
    <createQualificationContext.Provider
        value={
            {
                qualifications: state.data, loading, deleteQualification , deleting, 
                addQualificationErrors:state.addQualificationErrors , addQualification, adding, refresh, setRefresh,
                getQualification, updateQualification, updating,  updateQualificationErrors: state.updateQualificationErrors
            }
        }
    >
      {children}
    </createQualificationContext.Provider>
  )
}

export default QualificationContext
