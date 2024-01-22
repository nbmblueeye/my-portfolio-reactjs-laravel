import React, {useState, useRef} from 'react';
import Replies from './Replies';
import AnswerItem from './AnswerItem';
import { useCommentContext } from '../../../context/front-end/CommentContext';

const ReplyItem = ({comment}) => {

    const { displayImage, refresh, setRefresh, displayReply ,_setDisplayReply} = useCommentContext();

   
  return (
    <>
        <div className="reply-card-header">
            <div className='view-reply-button' onClick={(e) => _setDisplayReply(e, comment.id)}><p className='muted '><span><i className="bi bi-arrow-return-right fs-5"></i></span> {displayReply == comment.id ? "Hide all Reply":"View all Reply"}</p> </div>
            <p className='muted'>{displayReply != comment.id && comment.replies.length + " Replies"}</p>
        </div>
        <div className={`reply-card-box my_portfolio_border ${displayReply == comment.id ? "active":""}`}>
        
            {comment.replies.map((reply,index) => 
                <div className="reply-card" key={index}> 
                    <div className="avatar image-box-background">
                        <img src={displayImage()} alt="avatar" />
                    </div>
                    <div className="comment ">
                        <div className="header">
                        <h5 className='title'>{reply.user_comment.name}</h5>
                        <p className='muted'>{reply.created_at}</p>
                        </div>
                        <p>{reply.comment}</p>
                        <Replies post_id={comment.post_id} comment_id={reply.id} user_id={reply.user_id} layer="two"/>

                        {
                            reply.replies.length > 0 &&
                           <AnswerItem reply={reply}/>
                        }

                    </div>
                </div>  
            )}

        </div>
    </>
  )
}

export default ReplyItem