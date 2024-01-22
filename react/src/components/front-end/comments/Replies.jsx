import React, { useState, useRef, useEffect } from 'react'
import axiosClient from '../../../axiosClient';
import { useCommentContext } from '../../../context/front-end/CommentContext';

const Replies = ({ post_id, user_id, comment_id , layer}) => {

    const { user, setRefresh, displayReply , _setDisplayReply , displayAnswer, _setDisplayAnswer, showReply,_setShowReply} = useCommentContext();

    const [reply, setReply] = useState("");

    const [replying, setReplying]   = useState(null);
    const [deleting, setDeleting]   = useState(null);
    const [upvoted, setUpvoted]     = useState(null);
    const [downvoted, setDownvoted] = useState(null);
    const [likes, setLikes]         = useState([]);
    const [disLikes, setDisLikes]         = useState([]);
    const upvoteRef = useRef(true);

    const [replyFeedBack, setReplyFeedBack] = useState({
        message:"",
        error:"",
    });

    useEffect(() =>{ 
        getUpvote(); 
    }, []);

    
    const saveReply = async(e) => {
        e.preventDefault();
        if(comment_id){
            setReplying(comment_id)  

            let commentForm = new FormData();
            commentForm.append('post_id', post_id);
            commentForm.append('comment_id', comment_id);
            commentForm.append('comment', reply);
            
            await axiosClient.post('/post/comment', commentForm)
            .then(res => {
                setReplying(null)
                if(res.status == 201){
                    setReply("");
                    setRefresh(true);
                    if(!displayReply){
                        _setDisplayReply(e, comment_id);
                    }else if(displayReply){
                        if(!displayAnswer){
                            _setDisplayAnswer(e, comment_id)
                        }   
                    }
                    let { message } = res.data;
                    setReplyFeedBack({...replyFeedBack, ...{message:message, error:""}});
                    setTimeout(() => {
                        setReplyFeedBack({message:"", error:""});
                    }, 3000);
                } 
            })
            .catch(({response}) => {    
                setReplying(null);
                if(response){
                    if(response.status == 422){
                        setReplyFeedBack({...replyFeedBack, ...{message:"", error:response.data.message}});
                        setTimeout(() => {
                            setReplyFeedBack({message:"", error:""});
                        }, 3000);
                    }else if(response.status == 401){
                        setReplyFeedBack({...replyFeedBack, ...{message:"", error:"Please login to post your comment!"}});
                        setTimeout(() => {
                            setReplyFeedBack({message:"", error:""});
                        }, 3000);
                    }
                }
            })
        }
    }

    const deleteComment = async(e, comment_id) => {
        e.preventDefault();
        setDeleting(comment_id);
        await axiosClient.delete(`/post/comment/${ comment_id }`)
        .then(res =>{
            if(res && res.status == 204){
                setRefresh(true);
                setDeleting(null);
            }
        })
        .catch(error => {
          if(error){
            setDeleting(null);
            console.log(error);
          }
        })
    }

    const saveUpvoted = async(e, action) => {
        e.preventDefault();
        if(comment_id){
            let upvotedForm = new FormData();
            upvotedForm.append('is_upvoted', action);
            upvotedForm.append('comment_id', comment_id);  
            await axiosClient.post('/comment/upvoted', upvotedForm)
            .then(res => {
                if(res.status == 201){
                    const { data } = res.data;
                    if(action){
                        if(upvoted){
                            setUpvoted(null);
                            setLikes(likes.filter(like => like.id != data.id));
                        }else{
                            setUpvoted(action);
                            setLikes([...likes, data]);
                            setDisLikes(disLikes.filter(dislike => dislike.id != data.id ));
                            setDownvoted(null);
                        }                    
                    }else{
                        if(downvoted){
                            setDownvoted(null);
                            setDisLikes(disLikes.filter((disLike) => disLike.id != data.id));
                            
                        }else{
                            setDownvoted(!action);
                            setDisLikes([...disLikes, data]);
                            setLikes(likes.filter(like => like.id != data.id));
                            setUpvoted(null);
                        }
                    }
                }
            })
            .catch(({response}) => {    
                if(response.status == 401){
                    console.log(response);
                    setReplyFeedBack({...replyFeedBack, ...{message:"", error:"Please login first!"}});
                    setTimeout(() => {
                        setReplyFeedBack({message:"", error:""});
                    }, 3000);
                }
            })
        }
    }

    const getUpvote = async(e) => {
        if(comment_id){
            await axiosClient.get(`/comment/upvoted/${comment_id}`)
            .then(res =>{
                if(res.status == 200){
                    let { data, likes_ } = res.data;  
                    if(data){
                        data.map((like, index) => {
                            like.is_upvoted ? setUpvoted(true):setDownvoted(true);
                        });
                    }
                    if(likes_){
                        setLikes(likes_.filter(like => like.is_upvoted == true));
                        setDisLikes(likes_.filter(like => like.is_upvoted != true));
                    }
                }    
                })
            .catch(error => {   
                console.log(error);
            })
        }
    }

    
  return (
    <>
        <div className="reply-box"> 
            {
                replyFeedBack.message ?
                <div className="my_portfolio_feeback">
                    <div className="success">
                        <p> <strong>Success! </strong>{replyFeedBack.message}</p>
                    </div>
                </div>
                :
                ""
            }
            {
                replyFeedBack.error ?
                <div className="my_portfolio_feeback">
                    <div className="danger">
                        <p> <strong>Danger! </strong>{replyFeedBack.error}</p>
                    </div>
                </div>
                :
                ""
            }         
            <div className="action">
                {
                    layer !="three" &&
                    <div className="action_button reply" onClick={(e) => _setShowReply(e, comment_id)}>Reply</div>
                }
              {
                user_id == user?.id &&
                <div type="button" disabled = {deleting ==  comment_id ? true:false} className="action_button delete" onClick={(e) => deleteComment(e, comment_id)}>
                {
                    deleting ==  comment_id ?
                    (
                        <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
                    )
                    :
                    "Delete"  
                }                    
                </div>
              }
              <div className="action_button like">
                <div type="button" disabled = {!user ? true:false} className={`button_like ${upvoted ? "active":""}`} onClick={(e) => saveUpvoted(e, true)}>
                    <i className="bi bi-hand-thumbs-up fs-5"></i>
                    <span>{likes.length > 0 ? likes.length:""}</span>
                </div>
                <div type="button" disabled = {!user ? true:false} className={`button_dislike ${downvoted ? "active":""}`} onClick={(e) => saveUpvoted(e, false)}>
                    <i className="bi bi-hand-thumbs-down fs-5"></i>
                    <span>{disLikes.length > 0 ? disLikes.length:""}</span>
                </div>
              </div>
            </div>
           
           
            <form className={`reply-form ${showReply ==  comment_id ? "show":""}`} onSubmit={(e) => saveReply(e, post_id, comment_id, reply)}>
                <div className="mb-3">
                    <textarea className="form-control reply" id="reply" name="reply" rows="3" value={reply} onChange={(e) => setReply(e.target.value)}/>
                </div>
                <div className="submit_button_box">
                    <div></div>
                    <button type="submit" disabled={replying ==  comment_id ? true:false} className="btn btn-primary">
                    {
                        replying ==  comment_id ?
                        (
                            <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
                        )
                        :
                        "Post Reply"  
                    }                    
                    </button>
                </div>
            </form>
            
      </div>
    </>
  )
}

export default Replies