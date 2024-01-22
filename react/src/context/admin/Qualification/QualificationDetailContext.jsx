import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

  const initQualificationDetail = {
    data:[],
    qualificationItems: [],
    addQualificationDetailErrors:{},
    updateQualificationDetailErrors:{},
  }

  const reducer = (state, action) => {
      switch (action.type) {
        case "Initial_Qualification_Details":
          return {
            ...state, ...{ data: action.payload.data_, qualificationItems: action.payload.qualification_items_ }
          };

        case "Add_Qualification_Detail": 
          let error_keys = Object.keys(action.payload.errors); 
          if(error_keys.length > 0 )
          {
            return {...state, addQualificationDetailErrors: action.payload.errors};
          }else if( !action.payload.data){  
            return {...state, addQualificationDetailErrors: {}};
          }else if( action.payload.data ){  
            return {
              ...state, ...{data: [...state.data, action.payload.data], addQualificationDetailErrors: {}}
            };
          }

        case "Update_Qualification_Detail": 

          let update_error_keys = Object.keys(action.payload.errors); 
          if( update_error_keys.length > 0 )
          {

            return {...state, updateQualificationDetailErrors: action.payload.errors};

          }else if( !action.payload.data ){ 

            return {...state, updateQualificationDetailErrors: {}};

          }else if( action.payload.data ){ 

            return {
              ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item),  updateQualificationDetailErrors: {}}
            };

          }

        case "Delete_Qualification_Detail": 
          return {
            ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addQualificationDetailErrors: {},  updateQualificationDetailErrors:{} }
          };

        default:
            return state;
      }
    }
    
  const createQualificationDetailContext  = createContext( initQualificationDetail );
    
  export const useQualificationDetailContext = () =>  useContext( createQualificationDetailContext );

  const QualificationDetailContext = ( {children} ) => {
    const [state, dispatch] = useReducer( reducer, initQualificationDetail );

    const [loading, setLoading]     = useState(false);
    const [refresh, setRefresh]     = useState(false);
    const [adding, setAdding]       = useState(false);
    const [updating, setUpdating]   = useState(false);
    const [deleting, setDeleting]   = useState(null);
    const qualificationDetailInitRef          = useRef(true);

    useEffect(() =>{
        if(qualificationDetailInitRef.current){
            getQualificationDetails();
        }
        return () => {
            qualificationDetailInitRef.current = false;
        }
    }, []);

    const getQualificationDetails = async() => {
        setLoading(true); 
        await axiosClient.get('/admin/qualification_details')
        .then(res =>{
            if(res && res.status == 200){
            setLoading(false);
            let { qualification_items, data } = res.data;         
            dispatch({ type:"Initial_Qualification_Details", payload: {data_: data, qualification_items_: qualification_items} });
            }    
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        })
    }

    const addQualificationDetail = async(e, qualification_detail) => {
        e.preventDefault();
        setAdding(true);

        let qualificationDetailForm = new FormData();
        qualificationDetailForm.append('qualification_item_id', qualification_detail.qualification_item_id);
        qualificationDetailForm.append('title', qualification_detail.title);
        qualificationDetailForm.append('link', qualification_detail.link);
        qualificationDetailForm.append('description', qualification_detail.description);
        qualificationDetailForm.append('image', qualification_detail.image);

        await axiosClient.post('/admin/qualification_details', qualificationDetailForm)
        .then(res => {
          setAdding(false);
          if(res.status == 201){
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            dispatch({type: "Add_Qualification_Detail", payload: {data: res.data.data, errors:{}}});
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
              dispatch({type: "Add_Qualification_Detail", payload: {data: null, errors: response.data.errors}});
            }else if(response.status == 404){
              toast.fire({
                icon: 'error',
                title: response.data.error,
              });
              dispatch({type: "Add_Qualification_Detail", payload: {data: response.data.data, errors: {}}});
            }
          }
        })
    }

    const getQualificationDetail = ( qualification_detail_id ) => {
        if( qualification_detail_id ){
          let datas = state.data.filter( data => data.id == qualification_detail_id );
          if(datas.length > 0){
            return datas[0];
          }
        }
      }
    
    const updateQualificationDetail = async(e, qualification_detail_id, qualification_detail) => {
        e.preventDefault();
        setUpdating(true);
    
        let qualificationDetailForm = new FormData();
        qualificationDetailForm.append('qualification_item_id', qualification_detail.qualification_item_id);
        qualificationDetailForm.append('title', qualification_detail.title);
        qualificationDetailForm.append('link', qualification_detail.link);
        qualificationDetailForm.append('description', qualification_detail.description);
        qualificationDetailForm.append('image', qualification_detail.image);
        qualificationDetailForm.append('_method', 'put');

        await axiosClient.post(`/admin/qualification_details/${ qualification_detail_id }`, qualificationDetailForm)
        .then(res => {
            setUpdating(false);
            if(res.status == 202){
            toast.fire({
                icon: 'success',
                title: res.data.message,
            });
            dispatch({type: "Update_Qualification_Detail", payload: {data: res.data.data, errors:{}}});
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
                  dispatch({type: "Update_Qualification_Detail", payload: {data: null, errors: response.data.errors}});
              }else if(response.status == 404){
                  toast.fire({
                    icon: 'error',
                    title: response.data.error,
                  })
                  dispatch({type: "Update_Qualification_Detail", payload: {data: res.data.data, errors: {}}});
              }
          }
        })
    }

    const deleteQualificationDetail = (e, qualification_detail_id) => {
        e.preventDefault();
        setDeleting(qualification_detail_id);
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
                axiosClient.delete(`/admin/qualification_details/${ qualification_detail_id }`)
                .then(res =>{
                    if(res && res.status == 204){
                      dispatch({ type: "Delete_Qualification_Detail", payload: qualification_detail_id});
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
    <createQualificationDetailContext.Provider
        value={
        {
          qualification_details: state.data, loading, deleteQualificationDetail, deleting, 
          addQualificationDetailErrors:state.addQualificationDetailErrors , addQualificationDetail , adding, refresh, setRefresh,
          qualification_items: state.qualificationItems, getQualificationDetail, updateQualificationDetail, updating, updateQualificationDetailErrors: state.updateQualificationDetailErrors
        }
      }
    >
        {children}
    </createQualificationDetailContext.Provider>
  )
}

export default QualificationDetailContext