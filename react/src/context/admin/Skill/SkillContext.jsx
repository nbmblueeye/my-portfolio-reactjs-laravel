import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

  const initSkill = {
    data:[],
    addSkillErrors:{},
    updateSkillErrors:{},
  }

  const reducer = (state, action) => {
      switch (action.type) {
        case "Initial_Skills":
          return {
            ...state, data: action.payload
          };

        case "Add_Skill": 

          let error_keys = Object.keys(action.payload.errors); 
          if(error_keys.length > 0 )
          {
            return {...state, addSkillErrors: action.payload.errors};
          }else{  
            return {
              ...state, ...{data: [...state.data, action.payload.data], addSkillErrors: {}}
            };
          }

        case "Update_Skill": 
    
          let update_error_keys = Object.keys(action.payload.errors); 
          if( update_error_keys.length > 0 )
          {
            return {...state, updateSkillErrors: action.payload.errors};
    
          }else if( !action.payload.data ){ 
    
            return {...state, updateSkillErrors: {}};
    
          }else if( action.payload.data ){ 
    
            return {
              ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updateSkillErrors: {}}
            };
    
          }

        case "Delete_Skill": 

          return {
            ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addSkillErrors: {},  updateSkillErrors:{} }
          };

        default:
            return state;
      }
  }
    
  const createSkillContext  = createContext(initSkill);
    
  export const useSkillContext = () =>  useContext( createSkillContext );

const SkillContext = ( {children} ) => {

    const [state, dispatch] = useReducer(reducer, initSkill);

    const [loading, setLoading]   = useState(false);
    const [refresh, setRefresh]   = useState(false);
    const [adding, setAdding]     = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const skillInitRef = useRef(true);
    useEffect(() =>{
        if(skillInitRef.current){
            getSkills();
        }
        return () => {
            skillInitRef.current = false;
        }
    }, []);
    
    const getSkills = async() => {
      setLoading(true); 
      await axiosClient.get('/admin/skills')
      .then(res =>{
        if(res && res.status == 200){
          setLoading(false);
          let { data } = res.data;
          if(data){
            dispatch({ type:"Initial_Skills", payload: data });
          }
        }    
      })
      .catch(error => {
          setLoading(false);
          console.log(error);
      })
    }

    const addSkill = async(e, skill) => {
        e.preventDefault();
        setAdding(true);
       
        let skillForm = new FormData();
        skillForm.append('title', skill.title);
        skillForm.append('description', skill.description);
        skillForm.append('image', skill.image);

        await axiosClient.post('/admin/skills', skillForm)
        .then(res => {
          setAdding(false);
          if(res.status == 201){
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            dispatch({type: "Add_Skill", payload: {data: res.data.data, errors:{}}});
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
              dispatch({type: "Add_Skill", payload: {data: null, errors: response.data.errors}});
            }
          }
        })
    }

    const getSkill = ( skill_id ) => {
        if(skill_id){
          let datas = state.data.filter(data => data.id == skill_id);
          if(datas.length > 0){
            return datas[0];
          }
        }
      }
    
    const updateSkill = async(e, skill_id, skill) => {
      e.preventDefault();
      setUpdating(true);
  
      let skillForm = new FormData();
      skillForm.append('title',skill.title);
      skillForm.append('description', skill.description);
      skillForm.append('image',  skill.image);
      skillForm.append('_method', 'put');
      await axiosClient.post(`/admin/skills/${skill_id}`, skillForm)
      .then(res => {
        setUpdating(false);
        if(res.status == 202){
          toast.fire({
              icon: 'success',
              title: res.data.message,
          });
          dispatch({type: "Update_Skill", payload: {data: res.data.data, errors:{}}});
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
            dispatch({type: "Update_Skill", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
            toast.fire({
              icon: 'error',
              title: response.data.error,
            })
            dispatch({type: "Update_Skill", payload: {data: res.data.data, errors: {}}});
          }
          console.log(response);
        }
      })
    }
    
    const deleteSkill = (e, skill_id) => {
        e.preventDefault();
        setDeleting(skill_id);
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
                axiosClient.delete(`/admin/skills/${skill_id}`)
                .then(res =>{
                    if(res && res.status == 204){
                      dispatch({ type: "Delete_Skill", payload: skill_id });
                      toast.fire({
                        icon: 'warning',
                        title: 'Selected Skill was deleted',
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
    <createSkillContext.Provider
      value={
        {
          skills: state.data, loading, deleteSkill, deleting, 
          addSkillErrors:state.addSkillErrors , addSkill, adding, refresh, setRefresh,
          getSkill, updateSkill, updating,  updateSkillErrors: state.updateSkillErrors
        }
      }
    >
      {
        children
      }
    </createSkillContext.Provider>
  )
}

export default SkillContext
