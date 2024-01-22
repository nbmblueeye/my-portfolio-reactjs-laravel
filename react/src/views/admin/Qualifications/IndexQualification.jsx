import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import DisplayImage from '../../../components/admin/DisplayImage';
import { useQualificationContext } from '../../../context/admin/Qualification/QualificationContext';
import { useUserContext } from '../../../context/front-end/UserContext';

const IndexQualification = () => {

    const userContext = useUserContext();  
    const { qualifications, loading, deleteQualification , deleting,  } = useQualificationContext();

  let output = "";
  if(loading){
      output = <Loading/>            
  }else{
      output = qualifications.length > 0 ?
      <table className="table table-bordered text-center align-middle">
          <thead>
              <tr>
                    <th scope="col">#</th>
                    <th scope="col">title</th>
                    <th scope="col">description</th>
                    <th scope="col">Image</th>
                    <th scope="col">Created_at</th>
                    {
                        userContext.user.role == "Admin" && <th scope="col">Action</th>
                    }
              </tr>
          </thead>
          <tbody>
              {
                  qualifications.map((qualification, index) => 
                      { 
                          return (        
                          <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{qualification.title}</td>
                                <td>{qualification.description}</td>
                                <td className='text-center'><DisplayImage url={qualification.image} files="qualifications"/></td>
                                <td>{qualification.created_at}</td>
                                {
                                    userContext.user.role == "Admin" &&
                                    <td>
                                        <div className="my-portfolio-table-button">
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-update">
                                                        <Popover.Body>
                                                        Update Qualification
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <Link className="button update" to={`/admin/qualification/edit/${qualification.id}`}><i className="bi bi-pencil"></i></Link>
                                            </OverlayTrigger>
                                            &nbsp;
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-delete">
                                                        <Popover.Body>
                                                        Delete Qualification
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                            
                                            <button className="button delete" type='button' disabled={deleting == qualification.id ? true:false} onClick={(e) => deleteQualification(e, qualification.id)}>
                                                {
                                                    deleting == qualification.id ?
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
          <strong>There are no Qualifications Page Information available</strong>
      </div>
  }

  return (
    <>
    <div className="card-header d-flex justify-content-between">
        <h5 className="title">Qualifications</h5> 
        {
            userContext.user.role == "Admin" ?
            <Link to="/admin/qualification/add"> 
                <button className='btn btn-primary float-end p-2'>Add Qualification Information</button>
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

export default IndexQualification