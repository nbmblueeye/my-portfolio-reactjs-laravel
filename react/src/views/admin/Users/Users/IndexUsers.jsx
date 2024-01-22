import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useUserContext } from '../../../../context/admin/User/AdminUserContext';

const IndexUser = () => {

  const { users, loading, deleteUser, deleting, } = useUserContext();

  let output = "";
  if(loading){
    output = <Loading/>            
  }else{
    output = users.length > 0 ?
        (
          <table className="table table-bordered text-center align-middle my_portfolio_component">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User Name</th>
                  <th scope="col">User Email</th>
                  <th scope="col">User Role</th>
                  <th scope="col">Created_at</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((user, index) => {
                    return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.user_role}</td>
                          <td>{user.created_at}</td>
                          <td>
                              <div className="my-portfolio-table-button">
                                <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                    overlay={
                                          <Popover id="popover-update">
                                            <Popover.Body>
                                                Update User
                                            </Popover.Body>
                                          </Popover>
                                    }>
                                    <Link className="button update" to={`/admin/user/edit/${user.id}`}><i className="bi bi-pencil"></i></Link>
                                </OverlayTrigger>
                                 &nbsp;   
                                <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                    overlay={
                                      <Popover id="popover-delete">
                                        <Popover.Body>
                                            Delete User
                                        </Popover.Body>
                                      </Popover>
                                    }>
                                    <button className="button delete" type='button' disabled={deleting == user.id ? true:false} onClick={(e) => deleteUser(e, user.id)}>
                                      {
                                        deleting == user.id ?
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
              <strong>There are no User available</strong>
          </div>
        )
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between">
          <h5 className="title">Users</h5> 
          <Link to="/admin/user/add">
            <button className='btn btn-primary float-end p-2'>Add New User</button>
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

export default IndexUser