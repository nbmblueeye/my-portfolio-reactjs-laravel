import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

  const initSkillItem = {
    data:[],
    skills: [],
    addSkillItemErrors:{},
    updateSkillItemErrors:{},
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "Initial_Skill_Items":
        return {
          ...state, ...{data: action.payload.data_, skills: action.payload.skills_}
        };

      case "Add_Skill_Item": 
        let error_keys = Object.keys(action.payload.errors); 
        if(error_keys.length > 0 )
        {
          return {...state, addSkillItemErrors: action.payload.errors};
        }else if( !action.payload.data){  
          return {...state, addSkillItemErrors: {}};
        }else if( action.payload.data ){  
          return {
            ...state, ...{data: [...state.data, action.payload.data], addSkillItemErrors: {}}
          };
        }

      case "Update_Skill_Item": 

        let update_error_keys = Object.keys(action.payload.errors); 
        if( update_error_keys.length > 0 )
        {

          return {...state, updateSkillItemErrors: action.payload.errors};

        }else if( !action.payload.data ){ 

          return {...state, updateSkillItemErrors: {}};

        }else if( action.payload.data ){ 

          return {
            ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updateSkillItemErrors: {}}
          };

        }

      case "Delete_Skill_Item": 
        return {
          ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addSkillItemErrors: {}, updateSkillItemErrors:{} }
        };

      default:
          return state;
    }
  }
  
  const createSkillItemContext  = createContext( initSkillItem );
    
  export const useSkillItemContext = () =>  useContext( createSkillItemContext );

const SkillItemContext = ( {children} ) => {
    const [state, dispatch] = useReducer( reducer, initSkillItem );

    const [loading, setLoading]     = useState(false);
    const [refresh, setRefresh]     = useState(false);
    const [adding, setAdding]       = useState(false);
    const [updating, setUpdating]   = useState(false);
    const [deleting, setDeleting]   = useState(null);
    const skillItemInitRef          = useRef(true);

    useEffect(() =>{
        if(skillItemInitRef.current){
            getSkillItems();
        }
        return () => {
          skillItemInitRef.current = false;
        }
    }, []);
    
    const getSkillItems = async() => {
        setLoading(true); 
        await axiosClient.get('/admin/skill-items')
        .then(res =>{
            if(res && res.status == 200){
              setLoading(false);
              let { skills, data } = res.data;         
              dispatch({ type:"Initial_Skill_Items", payload: {data_:data, skills_:skills} });
            }    
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        })
    }

    const addSkillItem = async(e, skillItem) => {
        e.preventDefault();
        setAdding(true);

        let skillItemForm = new FormData();
        skillItemForm.append('skill_id', skillItem.skill_id);
        skillItemForm.append('title', skillItem.title);
        skillItemForm.append('description', skillItem.description);
        skillItemForm.append('percent', skillItem.percent);
        await axiosClient.post('/admin/skill-items', skillItemForm)
        .then(res => {
          setAdding(false);
          if(res.status == 201){
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            dispatch({type: "Add_Skill_Item", payload: {data: res.data.data, errors:{}}});
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
              dispatch({type: "Add_Skill_Item", payload: {data: null, errors: response.data.errors}});
            }else if(response.status == 404){
              toast.fire({
                icon: 'error',
                title: response.data.error,
              });
              dispatch({type: "Add_Skill_Item", payload: {data: response.data.data, errors: {}}});
            }
          }
        })
    }
  
    const getSkillItem = ( skillitem_id ) => {
        if( skillitem_id ){
          let datas = state.data.filter(data => data.id == skillitem_id);
          if(datas.length > 0){
            return datas[0];
          }
        }
      }
    
    const updateSkillItem = async(e, skillItem_id, skillItem) => {
      e.preventDefault();
      setUpdating(true);

      let skillItemForm = new FormData();
      skillItemForm.append('skill_id', skillItem.skill_id);
      skillItemForm.append('title', skillItem.title);
      skillItemForm.append('description', skillItem.description);
      skillItemForm.append('percent', skillItem.percent);
      skillItemForm.append('_method', 'put');
      await axiosClient.post(`/admin/skill-items/${skillItem_id}`, skillItemForm)
      .then(res => {
          setUpdating(false);
          if(res.status == 202){
          toast.fire({
              icon: 'success',
              title: res.data.message,
          });
          dispatch({type: "Update_Skill_Item", payload: {data: res.data.data, errors:{}}});
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
              dispatch({type: "Update_Skill_Item", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
              toast.fire({
              icon: 'error',
              title: response.data.error,
              })
              dispatch({type: "Update_Skill_Item", payload: {data: res.data.data, errors: {}}});
          }
          }
      })
    }
  
    const deleteSkillItem = (e, skillItem_id) => {
      e.preventDefault();
      setDeleting(skillItem_id);
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
              axiosClient.delete(`/admin/skill-items/${skillItem_id}`)
              .then(res =>{
                  if(res && res.status == 204){
                    dispatch({ type: "Delete_Skill_Item", payload: skillItem_id });
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
    <createSkillItemContext.Provider
      value={
        {
          skillItems: state.data, loading, deleteSkillItem, deleting, 
          addSkillItemErrors:state.addSkillItemErrors , addSkillItem, adding, refresh, setRefresh,
          skills: state.skills, getSkillItem, updateSkillItem, updating, updateSkillItemErrors: state.updateSkillItemErrors
        }
      }
    >
        {children}
    </createSkillItemContext.Provider>
  )
}

export default SkillItemContext
