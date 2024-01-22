import React, { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading';
import { Link } from 'react-router-dom';
import DisplayImage from '../../../../components/admin/DisplayImage';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useQualificationItemContext } from '../../../../context/admin/Qualification/QualificationItemContext';
import { useUserContext } from '../../../../context/front-end/UserContext';

const IndexQualificationItem = () => {

  const userContext = useUserContext();  
  const { qualification_items, loading, deleteQualificationItem, deleting,  } = useQualificationItemContext();

  let output = "";
  if(loading){
      output = <Loading/>            
  }else{
      output = qualification_items.length > 0 ?
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
              qualification_items.map((qualification_item, index) => 
                { 
                  return (        
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{qualification_item.title}</td>
                    <td>{qualification_item.description}</td>
                    <td className='text-center'><DisplayImage url={qualification_item.image} files="qualifications/qualification-items"/></td>
                    <td>{qualification_item.created_at}</td>
                    {
                      userContext.user.role == "Admin" &&
                      <td>
                          <div className="my-portfolio-table-button">
                              <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                  overlay={
                                      <Popover id="popover-update">
                                          <Popover.Body>
                                          Update Qualification-Item
                                          </Popover.Body>
                                      </Popover>
                                  }>
                                  <Link className="button update" to={`/admin/qualification/item/edit/${qualification_item.id}`}><i className="bi bi-pencil"></i></Link>
                              </OverlayTrigger>
                              &nbsp;
                              <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                  overlay={
                                      <Popover id="popover-delete">
                                          <Popover.Body>
                                          Delete Qualification-Item
                                          </Popover.Body>
                                      </Popover>
                                  }>
                        
                              <button className="button delete" type='button' disabled={deleting == qualification_item.id ? true:false} onClick={(e) => deleteQualificationItem(e, qualification_item.id)}>
                                {
                                    deleting == qualification_item.id ?
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
          <strong>There are no Qualification-Item Page Information available</strong>
      </div>
  }

  return (
      <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Qualification-Items</h5> 
            {
              userContext.user.role == "Admin" ?
              <Link to="/admin/qualification/item/add"> 
                <button className='btn btn-primary float-end p-2'>Add Qualification-Item Information</button>
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

export default IndexQualificationItem