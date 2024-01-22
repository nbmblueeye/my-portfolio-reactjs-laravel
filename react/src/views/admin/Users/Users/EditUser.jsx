import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { useUserContext } from '../../../../context/admin/User/AdminUserContext';

const EditUser = () => {

  const { user_id } = useParams();
  const { loading, roles ,getUser, updateUser, updating,  updateUserErrors } = useUserContext();

  const [user, setUser] = useState({
      name:'',
      email:'',
      user_role:'',
      password:'',
  });
 
  const _setUser = (e) => {
      setUser({...user, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let user_ =getUser(user_id);
      if( user_ ){
        setUser({...user,...{
            name: user_.name,
            email: user_. email,
            user_role: user_.user_role,
            password: user_. password,
          }
        });
      }
    }
  }, [loading]);

  let output = "";
  if(loading){
      output = <Loading/>
  }else{
      output =  (
        <>
            <form autoComplete='off'  onSubmit={(e) => updateUser(e, user_id, user)}>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="name">User Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={(e) => _setUser(e)}/>
                        <div className="errors">
                        {
                            updateUserErrors.hasOwnProperty('name') && updateUserErrors['name'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                    </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="text" className="form-control" id="email" name="email" value={user.email} onChange={(e) => _setUser(e)}/>
                        <div className="errors">
                        {
                            updateUserErrors.hasOwnProperty('email') && updateUserErrors['email'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                        </div>
                    </div>
                    <div className="col-md-6">
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
                            updateUserErrors.hasOwnProperty('user_role') && updateUserErrors['user_role'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="text" className="form-control" id="password" name="password" value={user.password} onChange={(e) => _setUser(e)}/>
                        <div className="errors">
                        {
                            updateUserErrors.hasOwnProperty('password') && updateUserErrors['password'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" disabled={updating ? true:false} className="btn btn-primary float-end">
                        {
                            updating ?
                            (
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Adding...</span>
                                </div>
                            )
                            :
                            <>Update User</>    
                        }
                    </button>
                </div>
            </form>
        </>
      )
  }

  return (
    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Edit User</h5> 
            <Link to="/admin/user/index">
                <button className='btn btn-primary float-end p-2'>Back</button>
            </Link>
        </div>
        <div className="card-body ">
            {
                output
            }
        </div>
    </>
  )
}

export default EditUser