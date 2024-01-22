import React, { useState,  useEffect } from 'react';
import Loading from '../../../components/Loading';
import { Link } from 'react-router-dom';
import DisplayImage from '../../../components/admin/DisplayImage';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useAboutContext } from '../../../context/admin/About/AboutContext';
import { useUserContext } from '../../../context/front-end/UserContext';


const IndexAbout = () => {

    const userContext = useUserContext();
    const { abouts, loading, deleting, deleteAbout } = useAboutContext();
   
    let output = "";
    if(loading){
        output = <Loading/>            
    }else{
        output = abouts.length > 0 ?
        <table className="table table-bordered text-center align-middle">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">title</th>
                        <th scope="col">sub_title</th>
                        <th scope="col">Introduction</th>
                        <th scope="col">Image</th>
                        <th scope="col">Created_at</th>
                        {
                           userContext.user.role == "Admin" && <th scope="col">Action</th>
                        }   
                    </tr>
                </thead>
                <tbody>
                    {
                        abouts.map((about, index) => 
                            { 
                                return (        
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{about.title}</td>
                                    <td>{about.sub_title}</td>
                                    <td className='text-start'>{about.introduction}</td>
                                    <td className='text-center'><DisplayImage url={about.image} files="abouts"/></td>
                                    <td>{about.created_at}</td>
                                    {
                                        userContext.user.role == "Admin" &&
                                        <td>
                                            <div className="my-portfolio-table-button">
                                                <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                    overlay={
                                                        <Popover id="popover-update">
                                                            <Popover.Body>
                                                            Update About Page
                                                            </Popover.Body>
                                                        </Popover>
                                                    }>
                                                    <Link className="button update" to={`/admin/about/edit/${about.id}`}><i className="bi bi-pencil"></i></Link>
                                                </OverlayTrigger>
                                                &nbsp;
                                                <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                    overlay={
                                                        <Popover id="popover-delete">
                                                            <Popover.Body>
                                                            Delete About Page
                                                            </Popover.Body>
                                                        </Popover>
                                                    }>
                                            
                                                    <button className="button delete" type='button' disabled={deleting == about.id && true} onClick={(e) => deleteAbout(e, about.id)}>
                                                    {
                                                        deleting == about.id ?
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
        </table>       
        : 
        <div className="d-flex align-items-center text-primary w-100 py-5">
            <strong>There are no About Page Information available</strong>
        </div>
    }

  return (
    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">About Page</h5> 
            {
                userContext.user.role == "Admin" ?
                <Link to="/admin/about/add">
                    <button className='btn btn-primary float-end p-2'>Add About Page Information</button>
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

export default IndexAbout