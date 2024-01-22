import React, { useEffect, useRef, useState } from 'react';
import axiosClient from '../../axiosClient';
import { useParams, useSearchParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import axios from 'axios';

const EmailVerification = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    const [loading, setLoading] = useState(false);
    let { user_id } = useParams();
    const [feedback, setFeeBack]    = useState({
        message:"",
        warning:"",
        error:"",
    });

    const isMounted = useRef(false);
    useEffect(() => { 
        
        const getEmailVerification = () => {
            if(!isMounted.current){
                setLoading(true);
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`).then(response => {
                    axios.get(`${import.meta.env.VITE_API_BASE_URL}/email/verify/${ user_id}`, {params: {expires: searchParams.get('expires'), signature: searchParams.get('signature')}})
                    .then(res => {
                        setLoading(false);
                        if(res.status == 202){
                            let { message } = res.data;
                            setFeeBack({...feedback, ...{message:message, warning: "", error:""}});
                        }      
                    })
                    .catch(({response}) => { 
                        setLoading(false);
                        if(response && response.status == 500){
                            setFeeBack({...feedback, ...{message:"", warning:response.data.warning, error:""}});
                        }else if(response && response.status == 403){
                            setFeeBack({...feedback, ...{message:"",  warning: "", error:response.data.error}});
                        }
                    })
                });
            }
        }
        getEmailVerification();
        return () => isMounted.current = true;
    }, []);

  return (
    <div className="container">
        <section className='my_portfolio_section_wrapper' >
            <div className="card shadow my_portfolio_section" style={{maxWidth:"600px"}}>
                <div className="card-header">
                    <h5>Register Email Verification</h5>
                </div>
                <div className="card-body">
                    {loading && <Loading/>}
                    {
                        feedback.message &&
                        <div className="my_portfolio_feeback">
                            <div className="success">
                                <p><strong>Success!</strong>{feedback.message}</p>
                            </div>
                        </div>   
                    }
                    {
                        feedback.warning &&
                        <div className="my_portfolio_feeback">
                            <div className="warning">
                                <p><strong>Warning!</strong>{feedback.warning}</p>
                            </div>
                        </div>   
                    }
                    {
                        
                        feedback.error &&
                        <div className="my_portfolio_feeback">
                            <div className="danger">
                                <p><strong>Danger!</strong>{feedback.error}</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    </div>
  )
}

export default EmailVerification