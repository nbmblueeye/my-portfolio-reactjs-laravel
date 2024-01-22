import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import DisplayImage from '../../../components/admin/DisplayImage';
import axiosClient from '../../../axiosClient';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useHomeContext } from '../../../context/admin/Home/HomeContext';
import { useUserContext } from '../../../context/front-end/UserContext';

const IndexHome = () => {

    const userContext = useUserContext();
    const { homes, loading, deleting, deleteHome } = useHomeContext();

    let output = "";
    if(loading){
        output = <Loading/>            
    }else{
        output = homes.length > 0 ?
        (<table className="table table-bordered text-center align-middle">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Sub_Title</th>
                    <th scope="col">Message</th>
                    <th scope="col">Image</th>
                    <th scope="col">Created_at</th>
                    {
                        userContext.user.role == "Admin" && <th scope="col">Action</th>    
                    }
                </tr>
            </thead>
            <tbody>
                {
                    homes.map((home, index) => 
                        { 
                            return (        
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{home.title}</td>
                                <td>{home.sub_title}</td>
                                <td>{home.message}</td>
                                <td><DisplayImage url={home.image} files="homes"/></td>
                                <td>{home.created_at}</td>
                                {
                                    userContext.user.role == "Admin" &&                        
                                    <td>
                                        <div className="my-portfolio-table-button">
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-update">
                                                        <Popover.Body>
                                                        Update Home Page
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <Link className="button update" to={`/admin/home/edit/${home.id}`}><i className="bi bi-pencil"></i></Link>
                                            </OverlayTrigger>
                                            &nbsp;
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-delete">
                                                        <Popover.Body>
                                                        Delete Home Page
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <button className="button delete" type='button' disabled={deleting == home.id ? true:false} onClick={(e) => deleteHome(e, home.id)}>
                                                {
                                                    deleting == home.id ?
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
                                }
                            </tr>  
                            )
                        }
                    )
                }
            </tbody>
        </table>)       
        : 
        (<div className="d-flex align-items-center text-primary w-100 py-5">
            <strong>There are no Home Page Information available</strong>
        </div>)
    }

  return (
    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Home Page</h5> 
            {
                userContext.user.role == "Admin" ?
                <Link to="/admin/home/add">
                 <button className='btn btn-primary float-end p-2'>Add Home Page Information</button>
                </Link>
                :
                <div></div>
            }      
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

export default IndexHome