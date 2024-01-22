import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useUserContext } from '../../context/front-end/UserContext';

const Login = () => {

    const emailRef      = useRef();
    const passwordRef   = useRef();
    const rememberRef   = useRef();
    const loginPageRef  = useRef(null);

    const [errors, setErrors]   = useState(['']);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const userContext = useUserContext();

    const userLogin = async(e) => {
        e.preventDefault();
        setLoading(true);

        let userForm = new FormData();
        userForm.append('email', emailRef.current.value);
        userForm.append('password', passwordRef.current.value);
        userForm.append('remember', rememberRef.current.checked);

        await axiosClient.post('/login', userForm)
        .then(res => {
            setLoading(false);
            if(res.status == 202){
                setErrors("");
                
                let { user, token, message } = res.data;
                toast.fire({
                    icon: 'success',
                    title: message,
                })
                userContext._setToken(token);
                userContext._setUser(user);
                
            }
            setTimeout(() => {
                emailRef.current.value = "";
                passwordRef.current.value = "";
                rememberRef.current.checked = false;
                navigate('/');
            }, 2000);
            
        })
        .catch(({response}) => { 
            setLoading(false);
            if(response){
                if(response.status == 422){
                    setErrors(response.data.errors)
                }else if(response.status == 401){
                    setErrors("");
                    toast.fire({
                        icon: 'error',
                        title: response.data.error,
                    })
                }else if(response && response.status == 403){
                    setErrors("");
                    toast.fire({
                        icon: 'error',
                        title: response.data.error,
                    })
                }
                console.log(response.data);
            }
        })
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [])
  

  return (
    <div className="container" ref={loginPageRef}>
        <section className='my_portfolio_section_wrapper my_portfolio_login'>
            <div className="card shadow my_portfolio_section">
                <div className="card-header">
                    <h5>User Login</h5>
                </div>
                <div className="card-body">
                    <form>
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
                            <div className="errors">
                                {
                                    errors.hasOwnProperty('password') && errors['password'].map((password, index) => (<p className='text-danger fst-italic' key={index}>{password}</p>))
                                }
                            </div>
                        </div>
                        
                        <div className="row g-3 mt-3">
                            <div className="col-12 col-md-6">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" name="remember" ref={rememberRef}/>
                                    <label className="form-check-label">Remember me</label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <p><Link to="/forgot-password" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hove float-md-end">Forgot password ?</Link></p>
                            </div>
                        </div>
                                             
                        <div className="row g-3 mt-3">
                            <div className="col-12 col-md-6">
                                <label className="form-label"><p>Not registered yet ?, <span><Link to="/register" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"> Register</Link></span></p></label>
                            </div>
                            <div className="col-12 col-md-6 mt-3">
                                <button type="submit" className="btn btn-primary float-md-end" onClick={(e) => userLogin(e)}>
                                    {
                                        loading ?
                                        (
                                            <div className="spinner-border text-success" role="status">
                                                <span className="visually-hidden">Logging...</span>
                                            </div>
                                        )
                                        :
                                        <>Login</>    
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

export default Login