import React, { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading';
import { Link } from 'react-router-dom';
import DisplayImage from '../../../../components/admin/DisplayImage';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useQualificationDetailContext } from '../../../../context/admin/Qualification/QualificationDetailContext';
import { useUserContext } from '../../../../context/front-end/UserContext';


const IndexQualificationDetail = () => {

  const userContext = useUserContext();  
  const { qualification_details, loading, deleteQualificationDetail, deleting,  } = useQualificationDetailContext();

  let output = "";
  if(loading){
      output = <Loading/>            
  }else{
      output = qualification_details.length > 0 ?
      <table className="table table-bordered text-center align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">title</th>
              <th scope="col">Link</th>
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
              qualification_details.map((qualification_detail, index) => 
                { 
                  return (        
                  <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{qualification_detail.title}</td>
                      <td>{qualification_detail.link}</td>
                      <td>{qualification_detail.description}</td>
                      <td className='text-center'><DisplayImage url={qualification_detail.image} files="qualifications/qualification-details"/></td>
                      <td>{qualification_detail.created_at}</td>
                      {
                        userContext.user.role == "Admin" &&
                        <td>
                          <div className="my-portfolio-table-button">
                              <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                  overlay={
                                      <Popover id="popover-update">
                                          <Popover.Body>
                                          Update Qualification-Detail
                                          </Popover.Body>
                                      </Popover>
                                  }>
                                  <Link className="button update" to={`/admin/qualification/detail/edit/${qualification_detail.id}`}><i className="bi bi-pencil"></i></Link>
                              </OverlayTrigger>
                              &nbsp;
                              <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                  overlay={
                                      <Popover id="popover-delete">
                                          <Popover.Body>
                                          Delete Qualification-Detail
                                          </Popover.Body>
                                      </Popover>
                                  }>
                                  <button className="button delete" type='button' disabled={deleting == qualification_detail.id ? true:false} onClick={(e) => deleteQualificationDetail(e, qualification_detail.id)}>
                                    {
                                        deleting == qualification_detail.id ?
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
          <strong>There are no Qualification-Detail Page Information available</strong>
      </div>
  }

  return (
      <>
        <div className="card-header d-flex justify-content-between">
          <h5 className="title">Qualification-Details</h5> 
          {
            userContext.user.role == "Admin" ?
            <Link to="/admin/qualification/detail/add">
              <button className='btn btn-primary float-end p-2'>Add Qualification-Detail Information</button>
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

export default IndexQualificationDetail