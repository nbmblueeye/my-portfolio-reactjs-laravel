import React, {useState, useEffect} from 'react';
import Replies from './Replies';
import { useCommentContext } from '../../../context/front-end/CommentContext';

const AnswerItem = ({reply}) => {

    const { displayImage, displayAnswer, _setDisplayAnswer} = useCommentContext();
 
  return (
    <>
        <div className="reply-card-header">
            <div className='view-reply-button' onClick={(e) => _setDisplayAnswer(e, reply.id)}><p className='muted '><span><i className="bi bi-arrow-return-right fs-5"></i></span> {displayAnswer == reply.id ? "Hide all Reply":"View all Reply"}</p> </div>
            <p className='muted'>{displayAnswer != reply.id && reply.replies.length + " Replies"}</p>
        </div>
        <div className={`reply-card-box my_portfolio_border ${displayAnswer == reply.id ? "active":""}`}>

            {reply.replies.map((answer,index) => 
                <div className="reply-card" key={index}> 
                    <div className="avatar image-box-background">
                        <img src={displayImage()} alt="avatar" />
                    </div>
                    <div className="comment ">
                        <div className="header">
                        <h5 className='title'>{answer.user_comment.name}</h5>
                        <p className='muted'>{answer.created_at}</p>
                        </div>
                        <p>{answer.comment}</p>
                        <Replies post_id={answer.post_id} comment_id={answer.id} user_id={answer.user_id} layer="three"/>
                    </div>
                </div>  
            )}

        </div>
    </>
  )
}

export default AnswerItem