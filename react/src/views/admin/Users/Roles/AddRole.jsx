import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRoleContext } from '../../../../context/admin/User/AdminRoleContext';


const AddRole = () => {

    const { addRoleErrors , addRole, adding, refresh, setRefresh, } = useRoleContext();

    const [role, setRole] = useState(
        {name: ""}
    );

    const _setRole = (e) => {
        setRole({...role, [e.target.name]: e.target.value});
    }     

    useEffect(() => {
        if(refresh){
          setTimeout(() => {
            setRole({
                name: ""
            })
          }, 2000)
        };
        return () => setRefresh(false);
      }, [refresh])

  return (
    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Add User Role</h5> 
            <Link to="/admin/user/role/index">
                <button className='btn btn-primary float-end p-2'>Back</button>
            </Link>
        </div>
        <div className="card-body ">
            <form autoComplete='off'>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Name of Role" value={role.name} onChange={(e) => _setRole(e)}/>
                    <div className="errors">
                        {
                            addRoleErrors.hasOwnProperty('name') && addRoleErrors['name'].map((name, index) => (<p className='text-danger fst-italic' key={index}>{name}</p>))
                        }
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" disabled={adding ? true:false} className="btn btn-primary float-end" onClick={(e) => addRole(e, role)}>
                        {
                            adding ?
                            (
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Adding...</span>
                                </div>
                            )
                            :
                            <>Add Role</>    
                        }
                    </button>
                </div>

            </form>
        </div>
    </>
  )
}

export default AddRole