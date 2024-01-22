import React, { useState, useRef, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axiosClient from '../../axiosClient';

const Register = () => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const registerPageRef = useRef(null);
    const confirmation_passwordRef = useRef();

    const [feedback, setFeeBack]    = useState({
        message:"",
        error:"",
    });

    const [errors, setErrors]       = useState(['']);
    const [loading, setLoading]     = useState(false);

    const userRegister = async(e) => {
        e.preventDefault();
        setLoading(true);

        let userForm = new FormData();
        userForm.append('name', nameRef.current.value);
        userForm.append('email', emailRef.current.value);
        userForm.append('password', passwordRef.current.value);
        userForm.append('password_confirmation', confirmation_passwordRef.current.value);

        await axiosClient.post('/register', userForm)
        .then(res => {
            setLoading(false);
            if(res.status == 200){
                setErrors([]);
                let { message } = res.data;
                setFeeBack({...feedback, ...{message:message, error:""}});
            }
           
           setTimeout(() => {
                nameRef.current.value = "" ;
                emailRef.current.value = "";
                passwordRef.current.value = "";
                confirmation_passwordRef.current.value = "";
                setFeeBack({...feedback, ...{message:"", error:""}});
           },8000)
                 
        })
        .catch(({response}) => { 
            setLoading(false);
            setErrors([]);
            if(response.status == 422){
                setErrors(response.data.errors)
            }else if(response.status == 500){
                setFeeBack({...feedback, ...{message:"", error:response.data.error}});
            }
            console.log(response.data);
        })
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [])

  return (
    
    <div className="container" ref={registerPageRef}>
        <section className='my_portfolio_section_wrapper my_portfolio_register'>
            <div className="card shadow my_portfolio_section">
                <div className="card-header">
                    <h5>User Register</h5>
                </div>
                <div className="card-body">
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
                            <div className="warning">
                                <p> <strong>Warning! </strong>{feedback.error}</p>
                            </div>
                        </div>
                        :
                        ""
                    }
                    <form onSubmit = {(e) => userRegister(e)}>
                        <div className="mb-3">
                            <label className="form-label">User Name</label>
                            <input type="text" className="form-control" name="user_name" placeholder="username" ref={nameRef}/>
                            <div className="errors">
                                {
                                    errors.hasOwnProperty('name') && errors['name'].map((name, index) => (<p className='text-danger fst-italic' key={index}>{name}</p>))
                                }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control" name="email" placeholder="user@gmail.com" ref={emailRef}/>
                            <div className="errors">
                                {
                                    errors.hasOwnProperty('email') && errors['email'].map((email, index) => (<p className='text-danger fst-italic' key={index}>{email}</p>))
                                }
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" placeholder="******" ref={passwordRef}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" name="confirmation_password" placeholder="******" ref={confirmation_passwordRef}/>
                            <div className="errors">
                                {
                                    errors.hasOwnProperty('password') && errors['password'].map((password, index) => (<p className='text-danger fst-italic' key={index}>{password}</p>))
                                }
                            </div>
                        </div>
                        <div className="mt-5">
                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <label className="form-label"><p>Already registered ?, <Link to="/login">Login</Link></p></label>
                            </div>
                            <div className="col-12 col-md-6">
                                <button type="submit" className="btn btn-primary float-md-end" >
                                    {
                                        loading ?
                                        (
                                            <div className="spinner-border text-success" role="status">
                                                <span className="visually-hidden">Registering...</span>
                                            </div>
                                        )
                                        :
                                        <>Register</>    
                                    }
                                    
                                </button>
                            </div>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>

  )
}

export default Register