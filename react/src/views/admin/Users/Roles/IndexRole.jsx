import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../../../components/Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useRoleContext } from '../../../../context/admin/User/AdminRoleContext';

const IndexRole = () => {

   const { roles, loading, deleteRole, deleting, } = useRoleContext();

   let output = "";
   if(loading){
      output = <Loading/>            
   }else{
      output = roles.length > 0 ?
         (
            <table className="table table-bordered text-center align-middle my_portfolio_component">
               <thead>
                  <tr>
                     <th scope="col">#</th>
                     <th scope="col">Role Name</th>
                     <th scope="col">Created_at</th>
                     <th scope="col">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     roles.map((role, index) => {
                        return (
                           <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{role.name}</td>
                              <td>{role.created_at}</td>
                              <td>
                                 <div className="my-portfolio-table-button">
                                    <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                       overlay={
                                             <Popover id="popover-update">
                                                <Popover.Body>
                                                   Update Role
                                                </Popover.Body>
                                             </Popover>
                                       }>
                                       <Link className="button update" to={`/admin/user/role/edit/${role.id}`}><i className="bi bi-pencil"></i></Link>
                                    </OverlayTrigger>
                                    &nbsp;
                                    <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                       overlay={
                                             <Popover id="popover-delete">
                                                <Popover.Body>
                                                   Delete Role
                                                </Popover.Body>
                                             </Popover>
                                       }>
                                       <button className="button delete" type='button' disabled={deleting == role.id ? true:false} onClick={(e) => deleteRole(e, role.id)}>
                                       {
                                          deleting == role.id ?
                                          (
                                             <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
                                          )
                                          :
                                          <i className="bi bi-trash3"></i>   
                                       }
                                       </button>
                                    </OverlayTrigger>
                                    
                                 </div>
                              </td>
                           </tr>
                        )
                     })
                  }
               </tbody>
            </table>      
         )
         :
         (
            <div className="d-flex align-items-center text-primary w-100 py-5">
               <strong>There are no Role available</strong>
            </div>
         )
   }

  return (
     <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">User Role</h5> 
            <Link to="/admin/user/role/add">
               <button className='btn btn-primary float-end p-2'>Add New Role</button>
            </Link>
        </div> 
        <div className="card-body">
            <div className="table-responsive">
              {
               output
              }
            </div>
        </div>
     </>
  )
}

export default IndexRole