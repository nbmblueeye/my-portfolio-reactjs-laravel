import React, { useRef, useState, useEffect} from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import axios from 'axios';
import axiosClient from '../../axiosClient';

const ResetPassword = () => {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const { token } = useParams();

    const passwordRef = useRef();
    const confirmation_passwordRef = useRef();

    const [expired, setExpired] = useState(false);
    const [errors, setErrors]   = useState([]);
    const [loading, setLoading] = useState(false);
    const [reseting, setReseting] = useState(false);

    const [feedback, setFeeBack]    = useState({
        message:"",
        warning:"",
        error:"",
    });

    const isMounted = useRef(false);
    useEffect(() => {

        const getResetPasswordForm = () => {
            if(!isMounted.current){
                setLoading(true);
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`).then(response => {
                    axios.get(`${import.meta.env.VITE_API_BASE_URL}/reset-password/${token}`, {params: {email: searchParams.get('email'), expires: searchParams.get('expires'), signature: searchParams.get('signature')}})
                    .then(res => {
                        setLoading(false);

                        if(res.status == 200){
                            let { message } = res.data;
                            setFeeBack({...feedback, ...{message:message, warning: "", error:""}});
                        }      
                    })
                    .catch(({response}) => { 
                        setLoading(false);

                        if(response && response.status == 403){
                            setExpired(true);
                            setFeeBack({...feedback, ...{message:"",  warning: "", error:response.data.error}});
                        }
                    });
                });
            }
        }
        getResetPasswordForm();
        return () => isMounted.current = true;

    }, []);

    const resetPassword = async(e) => {
        e.preventDefault();
        setReseting(true);

        let userForm = new FormData();
        userForm.append('email', searchParams.get('email'));
        userForm.append('token', token);
        userForm.append('password', passwordRef.current.value);
        userForm.append('password_confirmation', confirmation_passwordRef.current.value);

        await axiosClient.post(`/reset-password`, userForm)
        .then(res => {
            setReseting(false);
            if(res.status == 200){
                setErrors([]);
                let { message } = res.data;
                setFeeBack({...feedback, ...{message: message, warning: "", error:""}});
            }
            setTimeout(() => {
                passwordRef.current.value = "";
                confirmation_passwordRef.current.value = "";
                setFeeBack({...feedback, ...{message:"", warning: "", error:""}});
            }, 5000);  
        })
        .catch(({response}) => { 
            setReseting(false);
            if(response.status == 422){
                setErrors(response.data.errors)
            }else if(response.status == 403){
                setErrors([]);
                setFeeBack({...feedback, ...{message:"",  warning: "", error: response.data.error}});
            }
            console.log(response.data);
        })
    }

  let output = "";

  if(loading){

    output = <Loading/>; 
     
  }else{
    output = (
        <>
            {
                feedback.message ?
                <div className="my_portfolio_feeback">
                    <div className="success">
                        <p> <strong>Success! </strong>{feedback.message}</p>
                    </div>
                </div>
                :
                feedback.error ?
                <div className="my_portfolio_feeback">
                    <div className="danger">
                        <p> <strong>Danger! </strong>{feedback.error}</p>
                    </div>
                </div>
                :
                feedback.warning &&
                <div className="my_portfolio_feeback">
                    <div className="warning">
                        <p><strong>Warning!</strong>{feedback.warning}</p>
                    </div>
                </div>
                
            }
            {
                !expired &&
                <form onSubmit={(e) => resetPassword(e)}>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" placeholder="******" ref={passwordRef}/>
                        <div className="errors">
                            {
                                errors.hasOwnProperty('password') && errors['password'].map((password, index) => (<p className='text-danger fst-italic' key={index}>{password}</p>))
                            }
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirmation Password</label>
                        <input type="password" className="form-control" name="confirmation_password" placeholder="******" ref={confirmation_passwordRef}/>
                        <div className="errors">
                            {
                                errors.hasOwnProperty('confirmation_password') && errors['confirmation_password'].map((confirmation_password, index) => (<p className='text-danger fst-italic' key={index}>{confirmation_password}</p>))
                            }
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="d-flex justify-content-between">
                            <p> Go to  <span><Link to="/login" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"> Login</Link></span> Page</p>
                            <button type="submit" className="btn btn-primary float-end">
                                {
                                    reseting ?
                                    (
                                        <div className="spinner-border text-success" role="status">
                                            <span className="visually-hidden">Resetting...</span>
                                        </div>
                                    )
                                    :
                                    <>Reset Password</>    
                                }
                                
                            </button>
                        </div>
                    </div>
                </form>
            }  
        
        </>
    )

  }


  return (
    <div className="container">
        <section className='my_portfolio_section_wrapper'>
            <div className="card shadow my_portfolio_section">
                <div className="card-header">
                    <h5>Reset Password</h5>
                </div>
                <div className="card-body">
                    {
                        output
                    }
                </div>
            </div>
        </section>
    </div>
  )
}

export default ResetPassword
