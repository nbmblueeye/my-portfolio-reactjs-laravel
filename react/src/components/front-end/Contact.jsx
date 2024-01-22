import React, { useState, useEffect, useRef } from 'react';
import { usePageLoadingContext } from '../../context/PageLoadingContext';
import OverLay from '../OverLay';
import { useVisitorMessageContext } from '../../context/front-end/VisitorMessageContext';
import parse from "html-react-parser";

const Contact = ( { contactRef } ) => {
  
    const { contact }  = usePageLoadingContext(); 
    const { errors , addVisitorMessage , adding, feedback, refresh, setRefresh, messages_} = useVisitorMessageContext();
    const [showItem, setShowItem]   = useState(false);
    const [display, setDisplay]     = useState(false);
    const initRef                   = useRef(true);

    const [message, setMessage]     = useState({
        messageTitle:"",
        message:""
    });

    const _setMessage = (e) => {
        setMessage({...message, [e.target.name]: e.target.value});
    }

    useEffect(() =>{
        if(initRef.current){
            revealItem(contactRef);
            displayItem(contactRef);
        }
        if(refresh){
            setMessage({
                messageTitle:"",
                message:""
            })
        }
        return () => {
            initRef.current = false;
            setRefresh(false)
        };
    }, [refresh]);
  
    const revealItem = (referItem) => {     
        window.addEventListener( 'scroll', () => {
          
            let screenHeight = window.innerHeight;
            let scrollTop    = referItem.current?.getBoundingClientRect().top;
            if(scrollTop < screenHeight/2){
                setShowItem(true);
            }else{
                setShowItem(false);
            }
               
        });
    }

    const displayItem = (referItem) => {
        window.addEventListener( 'scroll', () => {   
            let screenHeight = window.innerHeight;
            let scrollBottom    = referItem.current?.getBoundingClientRect().bottom;
            if( screenHeight + screenHeight/2 > scrollBottom ){
                setDisplay(true);
            }else{
                setDisplay(false);
            }  
        });
    }

  return (
    <div className="my_portfolio_section contact" ref = {contactRef}>
        <div className="container">
            <div className="my-portfolio-title-box">
                <h4 className='title'>Contact Me</h4>
                <div className='title-line'></div>
            </div>
            <div className="content">
                {
                    Object.keys( contact ).length > 0 ?
                    <div className='row'>
                        <div className="col-12 col-md-6">
                            <div className="contact-informarion-box">
                                <div className={`contact-informarion-item phone my_portfolio_line box-shadow ${showItem ? "show_contact_left":""} my-portfolio-ovelay-box`}>
                                    <div className="image-box-background">
                                        <i className="bi bi-telephone-forward"></i>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Call Me</h5>
                                        <p className="card-text">{contact.phoneNo1}</p>
                                    </div>
                                    <OverLay data_tooltip=""/>
                                </div> 
                                <div className={`contact-informarion-item email my_portfolio_line box-shadow ${showItem ? "show_contact_left":""} my-portfolio-ovelay-box`}>
                                    <div className="image-box-background">
                                        <i className="bi bi-envelope-check"></i>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Email Me</h5>
                                        <p className="card-text">{contact.emailNo1}</p>
                                    </div>
                                    <OverLay data_tooltip=""/>
                                </div> 
                                <div className={`contact-informarion-item address my_portfolio_line box-shadow ${showItem ? "show_contact_left":""} my-portfolio-ovelay-box`}>
                                    <div className="image-box-background">
                                        <i className="bi bi-geo-alt"></i>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">Location</h5>
                                        <p className="card-text">{contact.address}</p>
                                    </div>
                                    <OverLay data_tooltip=""/>
                                </div>
                            </div>  
                        </div>
                        <div className="col-12 col-md-6">
                            <div className={`contact-form-box box-shadow ${ display ? "show_contact_bottom":"" } ${showItem ? "show_contact_right":""}`}>
                                <div className="contact-form-title my_portfolio_line">
                                    <p className='muted'>Please leave your message here!</p>
                                </div>
                                {
                                    feedback.message &&
                                    <div className="my_portfolio_feeback">
                                        <div className="success">
                                            <div><strong>Success!</strong> {parse(feedback.message)} </div>
                                        </div>
                                    </div>   
                                }
                                {
                                    feedback.error &&
                                    <div className="my_portfolio_feeback">
                                         <div className="danger">
                                            <p><strong>Danger!</strong> {feedback.error}</p>
                                        </div>
                                    </div>   
                                }
                   
                                <form onSubmit={(e) => addVisitorMessage(e, message)} >     
                                    <div className="mb-3">
                                        <label className="form-label card-title" htmlFor='messageTitle'>Message Title</label>
                                        <input type="text" id="messageTitle" name='messageTitle' className="form-control" value={message.messageTitle} onChange={(e) => _setMessage(e)}/>
                                        <div className="errors">
                                            {
                                                errors.hasOwnProperty('messageTitle') && errors['messageTitle'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                                            }
                                        </div>     
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label card-title" htmlFor='message'>Message Information</label>
                                        <textarea id='message' name='message' className="form-control" rows="4" value={message.message} onChange={(e) => _setMessage(e)}></textarea>
                                        <div className="errors">
                                            {
                                                errors.hasOwnProperty('message') && errors['message'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                                            }
                                        </div>    
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div></div>
                                        <button type="submit" disabled={adding ? true:false} className="btn btn-primary">
                                            {
                                                adding ?
                                                (
                                                    <div className="spinner-border text-success" role="status">
                                                        <span className="visually-hidden">Submitting...</span>
                                                    </div>
                                                )
                                                :
                                                <>Submit</>    
                                            }
                                        </button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div> 
                    : 
                    <div className="row d-flex align-items-center">
                        <div className="col-12 p-5">
                            <div className="text-center">
                                <h5>There're no information On Contact Page</h5>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Contact