import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../axiosClient';


  const createCommentContext = createContext();
    
  export const useCommentContext = () =>  useContext( createCommentContext );

const CommentContext = ( {children} ) => {

    const [user, setUser] = useState(null);

    const [comments, setComments] = useState([]);
    const [saving, setSaving]     = useState(false);
    const [refresh, setRefresh]    = useState(true);

    const [displayReply, setDisplayReply] =  useState(null);
    const [displayAnswer, setDisplayAnswer] =  useState(null);

    const [showReply, setShowReply] = useState(null);

    const [feedback, setFeeBack]    = useState({
        message:"",
        error:"",
    });

    const displayImage = (avatar) => { 
        let photo = "";
        if(avatar){
            if(avatar.indexOf(';base64') != -1){
                photo = avatar;
            }else{
                photo = `${import.meta.env.VITE_API_BASE_URL}/images/avatars/${avatar}`;
            }
        }else{
            photo = `${import.meta.env.VITE_API_BASE_URL}/images/avatar.png`;
        }
        return photo;
    }

    const getComments = async(post_id) => {
        if(post_id){
            await axiosClient.get(`/post/comment/${post_id}`)
            .then(res =>{
            if(res.status == 200){
                let { data, user_ } = res.data;
                if(data){
                    setComments(data);
                }
                if(user_){
                  setUser(user_);
                }
            }    
            })
            .catch(error => {   
                console.log(error);
            })
        }
    }

    const saveComment = async(e, post_id, comment) => {
        e.preventDefault();
        setSaving(true);
        let commentForm = new FormData();
        commentForm.append('post_id', post_id);
        commentForm.append('comment_id', "");
        commentForm.append('comment', comment);
         
        await axiosClient.post('/post/comment', commentForm)
        .then(res => {
          setSaving(false);
          if(res.status == 201){
            let { message } = res.data;
            setFeeBack({...feedback, ...{message:message, error:""}});
            setRefresh(true);
            setTimeout(() => {
              setFeeBack({message:"", error:""});
            }, 3000);
          } 
        })
        .catch(({response}) => { 
          setSaving(false);
          if(response){
              if(response.status == 422){
                setFeeBack({...feedback, ...{message:"", error:response.data.message}});
                setTimeout(() => {
                  setFeeBack({message:"", error:""});
                }, 3000);
    
              }else if(response.status == 401){
                setFeeBack({...feedback, ...{message:"", error:"Please login to post your comment!"}});
                setTimeout(() => {
                  setFeeBack({message:"", error:""});
                }, 3000);
              }
          }
        })
    }

    const _setShowReply = (e, id) => {
      e.preventDefault();
      if(!showReply && id){
          setShowReply(id);
      }else if(showReply && id != showReply){
          setShowReply(id);
      }else{
        setShowReply(null);
      }
    }

    const _setDisplayReply = (e, id) => {
        e.preventDefault();
        if(!displayReply){
            setDisplayReply(id);
        }else if(displayReply && displayReply != id){
            setDisplayReply(id);
        }else{
            setDisplayReply(null);
            if(showReply){
              setShowReply(null);
            } 
            if(displayAnswer){
              setDisplayAnswer(null);
            }
        }
    }
 
    const _setDisplayAnswer = (e, answer_id) => {
        e.preventDefault();
        if(displayReply){
            if(!displayAnswer && answer_id){
              setDisplayAnswer(answer_id);
            }else if(displayAnswer && answer_id != displayAnswer){
                setDisplayAnswer(answer_id);
            }else{
                setDisplayAnswer(null);
            }
        }else{
          setDisplayAnswer(null);
        }
       
    }


  return (
    <createCommentContext.Provider
        value={
            {
                displayImage,
                getComments, 
                saveComment,
                comments,
                refresh,
                setRefresh,
                feedback,
                setFeeBack,
                saving,
                displayReply,
                _setDisplayReply,
                displayAnswer,
                _setDisplayAnswer,
                showReply,
                _setShowReply,
                user,
            }
        }
    >
        {children}
    </createCommentContext.Provider>
  )
}

export default CommentContext