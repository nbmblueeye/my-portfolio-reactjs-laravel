import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../../../axiosClient';
import { useUserContext } from '../../../../context/admin/User/AdminUserContext';

const AddUser = () => {

    const { roles, addUserErrors , addUser, adding, refresh, setRefresh, } = useUserContext();

    const [user, setUser]       = useState({
        name:'',
        email:'',
        user_role:'',
        password:'',
    });

    const _setUser = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(refresh){
            setTimeout(() => {
            setUser({
                name:'',
                email:'',
                user_role:'',
                password:'',
            })
            }, 2000)
        };
        return () => setRefresh(false);
    }, [refresh])

  return (
    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Add New User</h5> 
            <Link to="/admin/user/index">
                <button className='btn btn-primary float-end p-2'>Back</button>
            </Link>
        </div>
        <div className="card-body ">
            <form autoComplete='off' onSubmit={(e) => addUser(e, user)}>
                <div className="row g-3">
                    <div className="col-md-6 mb-3">
                        <label className="form-label" htmlFor="name">User Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={(e) => _setUser(e)}/>
                        <div className="errors">
                            {
                                addUserErrors.hasOwnProperty('name') && addUserErrors['name'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                            }
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" name="email" value={user.email} onChange={(e) => _setUser(e)}/>
                        <div className="errors">
                            {
                                addUserErrors.hasOwnProperty('email') && addUserErrors['email'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                            }
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label" htmlFor='user_role'>User Role</label>
                        <select className="form-select" id='user_role' name='user_role' value={user.user_role} onChange={(e) => _setUser(e)}>
                            <option value="">Choose...</option>
                            {
                                roles.length > 0 && 
                                roles.map((role,index) => {
                                   return <option key={index} value={role.name}>{role.name}</option>
                                })
                            }
                        </select>
                        <div className="errors">
                        {
                            addUserErrors.hasOwnProperty('user_role') && addUserErrors['user_role'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label"htmlFor="password">Password</label>
                        <input type="text" className="form-control" id="password" name="password" value={user.password} onChange={(e) => _setUser(e)}/>
                        <div className="errors">
                        {
                            addUserErrors.hasOwnProperty('password') && addUserErrors['password'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" disabled={adding ? true:false} className="btn btn-primary float-end">
                        {
                            adding ?
                            (
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Adding...</span>
                                </div>
                            )
                            :
                            <>Add User</>    
                        }
                    </button>
                </div>

            </form>
        </div>
    </>
  )
}

export default AddUser
