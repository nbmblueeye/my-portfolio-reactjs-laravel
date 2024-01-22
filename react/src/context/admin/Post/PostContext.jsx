import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

  const initPost = {
    data:[],
    addPostErrors:{},
    updatePostErrors:{},
  }

  const reducer = (state, action) => {
      switch (action.type) {

        case "Initial_Posts":
          return {
            ...state, data: action.payload
          };

        case "Add_Post": 

          let error_keys = Object.keys(action.payload.errors); 
          if(error_keys.length > 0 )
          {
            return {...state, addPostErrors: action.payload.errors};
          }else{  
            return {
              ...state, ...{data: [...state.data, action.payload.data], addPostErrors: {}}
            };
        }

        case "Update_Post": 
    
          let update_error_keys = Object.keys(action.payload.errors); 
          if( update_error_keys.length > 0 )
          {
            return {...state, updatePostErrors: action.payload.errors};
    
          }else if( !action.payload.data ){ 
    
            return {...state, updatePostErrors: {}};
    
          }else if( action.payload.data ){ 
    
            return {
              ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updatePostErrors: {}}
            };
    
        }

        case "Delete_Post": 

          return {
            ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addPostErrors: {},  updatePostErrors:{} }
          };

        default:
            return state;
      }
  }
    
  const createPostContext  = createContext( initPost );
    
  export const usePostContext = () =>  useContext( createPostContext );

const PostContext = ( {children} ) => {

    const [state, dispatch] = useReducer(reducer, initPost);

    const [loading, setLoading]   = useState(false);
    const [refresh, setRefresh]   = useState(false);
    const [adding, setAdding]     = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const postInitRef = useRef(true);

    useEffect(() =>{
        if(postInitRef.current){
            getPosts();
        }
        return () => {
            postInitRef.current = false;
        }
    }, []);
    
    const getPosts = async() => {
      setLoading(true); 
      await axiosClient.get('/admin/posts')
      .then(res =>{
        if(res && res.status == 200){
          setLoading(false);
          let { data } = res.data;
          if(data){
            dispatch({ type:"Initial_Posts", payload: data });
          }
        }    
      })
      .catch(error => {
          setLoading(false);
          console.log(error);
      })
    }

    const addPost = async(e, post, description) => {
        e.preventDefault();
        setAdding(true);
       
        let postForm = new FormData();
        postForm.append('title', post.title);
        postForm.append('description', description);
        postForm.append('thumbnail', post.image);
       
        await axiosClient.post('/admin/posts', postForm)
        .then(res => {
          setAdding(false);
          if(res.status == 201){
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            dispatch({type: "Add_Post", payload: {data: res.data.data, errors:{}}});
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
              dispatch({type: "Add_Post", payload: {data: null, errors: response.data.errors}});
            }
          }
        })
    }

    const getPost = ( post_id ) => {
        if( post_id ){
          let datas = state.data.filter(data => data.id == post_id );
          if(datas.length > 0){
            return datas[0];
          }
        }
      }
    
    const updatePost = async(e, post_id, post, description) => {
      e.preventDefault();
      setUpdating(true);
  
      let postForm = new FormData();
      postForm.append('title', post.title);
      postForm.append('description', description);
      postForm.append('thumbnail', post.image);
      postForm.append('_method', 'put');
  
      await axiosClient.post(`/admin/posts/${post_id}`, postForm)
      .then(res => {
        setUpdating(false);
        if(res.status == 202){
          toast.fire({
              icon: 'success',
              title: res.data.message,
          });
          dispatch({type: "Update_Post", payload: {data: res.data.data, errors:{}}});
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
            dispatch({type: "Update_Post", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
            toast.fire({
              icon: 'error',
              title: response.data.error,
            })
            dispatch({type: "Update_Post", payload: {data: res.data.data, errors: {}}});
          }
          console.log(response);
        }
      })
    }
    
    const deletePost = (e, post_id) => {
        e.preventDefault();
        setDeleting(post_id);
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
                axiosClient.delete(`/admin/posts/${post_id}`)
                .then(res =>{
                    if(res && res.status == 204){
                      dispatch({ type: "Delete_Post", payload: post_id });
                      toast.fire({
                        icon: 'warning',
                        title: 'Selected Post was deleted',
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
    <createPostContext.Provider
      value={
        {
          posts: state.data, loading, deletePost, deleting, 
          addPostErrors:state.addPostErrors , addPost, adding, refresh, setRefresh,
          getPost, updatePost, updating, updatePostErrors: state.updatePostErrors
        }
      }
    >
      {children}
    </createPostContext.Provider>
  )
}

export default PostContext