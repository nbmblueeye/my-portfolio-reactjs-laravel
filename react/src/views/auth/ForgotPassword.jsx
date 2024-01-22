import React, { useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';

const ForgotPassword = () => {

    const emailRef = useRef();
    const [errors, setErrors]   = useState([]);
    const [loading, setLoading] = useState(false);

    const [feedback, setFeeBack]    = useState({
        message:"",
        warning:"",
        error:"",
    });

    const forgotPasswordRequest = async(e) => {
        e.preventDefault();
        setLoading(true);

        let userForm = new FormData();
        userForm.append('email', emailRef.current.value);
        await axiosClient.post('/forgot-password', userForm)
        .then(res => {
            setLoading(false);
            if(res.status == 200){
                setErrors([]);
                let { message } = res.data;
                setFeeBack({...feedback, ...{message: message, warning: "", error:""}});
            }
            setTimeout(() => {
                emailRef.current.value = "";
                setFeeBack({...feedback, ...{message:"", warning: "", error:""}});
            }, 10000);  
        })
        .catch(({response}) => { 
            setLoading(false);
            if(response.status == 422){
                setErrors(response.data.errors)
            }else if(response.status == 403){
                setErrors([]);
                setFeeBack({...feedback, ...{message:"",  warning: "", error: response.data.error}});
            }else if(response && response.status == 500){
                setErrors([]);
                setFeeBack({...feedback, ...{message:"", warning: response.data.warning, error:""}});
            }
            console.log(response.data);
        })
    }

  return (
    <div className="container">
    <section className='my_portfolio_section_wrapper'>
        <div className="card shadow my_portfolio_section">
            <div className="card-header">
                <h5>Forgot Password</h5>
            </div>
            <div className="card-body">
                {
                    !feedback.message && !feedback.error && !feedback.warning?
                    <>
                        <p className='mb-0 text-secondary'>Forgot your password? Please enter your registered Email address.</p>
                        <p className='text-secondary'> You will receive a Link to create a new password via Email</p>
                    </>
                    :
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
                <form onSubmit={(e) => forgotPasswordRequest(e)}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" placeholder="user@gmail.com" ref={emailRef}/>
                        <div className="errors">
                            {
                                errors.hasOwnProperty('email') && errors['email'].map((email, index) => (<p className='text-danger fst-italic' key={index}>{email}</p>))
                            }
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="d-flex justify-content-between">
                            <p> Go to  <span><Link to="/login" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"> Login</Link></span> Page</p>
                            <button type="submit" className="btn btn-primary">
                                {
                                    loading ?
                                    (
                                        <div className="spinner-border text-success" role="status">
                                            <span className="visually-hidden">Logging...</span>
                                        </div>
                                    )
                                    :
                                    <>Send Email</>    
                                }
                            </button>
                        </div>
                       
                    </div>
                </form>
            </div>
        </div>
    </section>
</div>
  )
}

export default ForgotPassword