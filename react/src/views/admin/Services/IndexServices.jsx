import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import DisplayImage from '../../../components/admin/DisplayImage';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useServiceContext } from '../../../context/admin/Service/ServiceContext';
import { useUserContext } from '../../../context/front-end/UserContext';

const IndexService = () => {

  const userContext = useUserContext();   
  const { services, loading, deleteService, deleting, } = useServiceContext();

  let output = "";
  if(loading){
      output = <Loading/>            
  }else{
      output = services.length > 0 ?
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
                  services.map((service, index) => 
                      { 
                          return (        
                          <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{service.title}</td>
                              <td>{service.description}</td>
                              <td className='text-center'><DisplayImage url={service.image} files="services"/></td>
                              <td>{service.created_at}</td>
                              {
                                userContext.user.role == "Admin" &&
                                <td>
                                    <div className="my-portfolio-table-button">
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                            overlay={
                                                <Popover id="popover-update">
                                                    <Popover.Body>
                                                    Update Service
                                                    </Popover.Body>
                                                </Popover>
                                            }>
                                            <Link className="button update" to={`/admin/service/edit/${service.id}`}><i className="bi bi-pencil"></i></Link>
                                        </OverlayTrigger>
                                        &nbsp;
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-delete">
                                                        <Popover.Body>
                                                        Delete Service
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <button className="button delete" type='button' disabled={deleting == service.id ? true:false} onClick={(e) => deleteService(e, service.id)}>
                                                {
                                                    deleting == service.id ?
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
          <strong>There are no Services Page Information available</strong>
      </div>
  }
    return (
        <>
            <div className="card-header d-flex justify-content-between">
                <h5 className="title">Services</h5>
                {
                    userContext.user.role == "Admin" ?
                    <Link to="/admin/service/add">                 
                        <button className='btn btn-primary float-end p-2'>Add Service Information</button>
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

export default IndexService 