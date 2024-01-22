import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { useRoleContext } from '../../../../context/admin/User/AdminRoleContext';

const EditRole = () => {

    const { role_id } = useParams();

    const { loading, getRole, updateRole, updating, updateRoleErrors } = useRoleContext();
    const [role, setRole] = useState({
        name:''
    });
    
    const _setRole = (e) => {
        setRole({...role, [e.target.name]: e.target.value});
    }

    useEffect(() =>{
        if(!loading){
            let role_ = getRole(role_id);
            if( role_ ){
                setRole({...role,...{
                        name: role_.name
                    }
                });
            }
        }
    }, [loading]);

    let output = "";
    if(loading){
        output = <Loading/>
    }else{
        output = ( 
            <>
                <form autoComplete='off' onSubmit={(e) => updateRole(e, role_id, role)}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" placeholder="Name of Role" value={role.name} onChange={(e) => _setRole(e)} />
                        <div className="errors">
                            {
                                updateRoleErrors.hasOwnProperty('name') && updateRoleErrors['name'].map((name, index) => (<p className='text-danger fst-italic' key={index}>{name}</p>))
                            }
                        </div>
                    </div>
                    <div className="mt-5">
                        <button type="submit" disabled={updating ? true:false} className="btn btn-primary float-end">
                            {
                                updating ?
                                (
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Updating...</span>
                                    </div>
                                )
                                :
                                <>Update Role</>    
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
                <h5 className="title">Edit User Role</h5> 
                <Link to="/admin/user/role/index">
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

export default EditRole
