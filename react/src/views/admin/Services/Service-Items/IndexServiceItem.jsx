import React, { useEffect, useState } from 'react';
import Loading from '../../../../components/Loading';
import { Link } from 'react-router-dom';
import axiosClient from '../../../../axiosClient';
import DisplayImage from '../../../../components/admin/DisplayImage';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useServiceItemContext } from '../../../../context/admin/Service/ServiceItemContext';
import { useUserContext } from '../../../../context/front-end/UserContext';

const IndexServiceItem = () => {

  const userContext = useUserContext();
  const { service_items, loading, deleteServiceItem, deleting, } = useServiceItemContext();

  let output = "";
  if(loading){
      output = <Loading/>            
  }else{
      output = service_items.length > 0 ?
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
              service_items.map((service_item, index) => 
                { 
                  return (        
                  <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{service_item.title}</td>
                      <td>{service_item.link}</td>
                      <td>{service_item.description}</td>
                      <td className='text-center'><DisplayImage url={service_item.image} files="services/service-items"/></td>
                      <td>{service_item.created_at}</td>
                      {
                        userContext.user.role == "Admin" &&
                        <td>
                          <div className="my-portfolio-table-button">
                              <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                  overlay={
                                      <Popover id="popover-update">
                                          <Popover.Body>
                                            Update Service_Item
                                          </Popover.Body>
                                      </Popover>
                                  }>
                                  <Link className="button update" to={`/admin/service/item/edit/${service_item.id}`}><i className="bi bi-pencil"></i></Link>
                              </OverlayTrigger>
                              &nbsp;
                              <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                  overlay={
                                      <Popover id="popover-delete">
                                          <Popover.Body>
                                            Delete Service_Item
                                          </Popover.Body>
                                      </Popover>
                                  }>
                                <button className="button delete" type='button' disabled={deleting == service_item.id ? true:false} onClick={(e) => deleteServiceItem(e, service_item.id)}>
                                  {
                                    deleting == service_item.id ?
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
          <h5 className="title">Service_Items</h5>
          {
            userContext.user.role == "Admin" ?
            <Link to="/admin/service/item/add">
              <button className='btn btn-primary float-end p-2'>Add Service_Items Information</button>
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

export default IndexServiceItem