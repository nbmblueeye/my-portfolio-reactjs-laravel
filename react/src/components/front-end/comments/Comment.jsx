import React, { useEffect, useState, useRef } from 'react'
import axiosClient from '../../../axiosClient';
import { useCommentContext } from '../../../context/front-end/CommentContext';
import Replies from './Replies';
import ReplyItem from './ReplyItem';

const Comment = ({ post_id }) => {

  const { displayImage, refresh, setRefresh , getComments, comments , saveComment, saving , feedback} = useCommentContext();
  const [comment, setComment]   = useState("");

  useEffect(() =>{ 
    if(refresh){
      getComments(post_id);
      setComment("");
    }
    return () => setRefresh(false);
  }, [refresh]);

  return (
    <>
      <div className="comment-box">
        <h3 className='title'>Leave Your Comment</h3>
        {
          feedback.message ?
          <div className="my_portfolio_feeback">
              <div className="success">
                  <p> <strong>Success! </strong>{feedback.message}</p>
              </div>
          </div>
          :
          ""
        }
        {
          feedback.error ?
          <div className="my_portfolio_feeback">
              <div className="danger">
                  <p> <strong>Danger! </strong>{feedback.error}</p>
              </div>
          </div>
          :
          ""
        }
        <div className="content">
          <div className="avatar image-box-background">
              <img src={displayImage()} alt="avatar" />
          </div>
          <form onSubmit={(e) => saveComment(e, post_id, comment)}>
            <div className="mb-3">
              <textarea className="form-control" id="comment" name="comment" rows="3" value={comment} onChange={(e) => setComment(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-primary float-end">
              {
                saving ?
                (
                  <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
                )
                :
                "Post Comment"  
              }                    
            </button>
          </form>
        </div>
      </div>
      <div className="display-comment-box">
          {
            comments.length > 0 ?
            comments.map((comment, index) =>
              (
                <div className="comment-card-box my_portfolio_box" key={index}>
                  <div className="comment-card"> 
                    <div className="avatar image-box-background">
                        <img src={displayImage()} alt="avatar" />
                    </div>
                    <div className="comment ">
                      <div className="header">
                        <h5 className='title'>{comment.user_comment.name}</h5>
                        <p className='muted'>{comment.created_at}</p>
                      </div>
                      <p>{comment.comment}</p>
                      <Replies post_id={comment.post_id} comment_id={comment.id} user_id={comment.user_id} layer="one"/>
                        {
                          comment.replies.length > 0 &&
                          <ReplyItem comment={comment}/>
                        }
                    </div>
                  </div>
                  
                </div> 
              )
            )  
            :
            ""
          }
      </div>
    </>
  )
}

export default Comment
