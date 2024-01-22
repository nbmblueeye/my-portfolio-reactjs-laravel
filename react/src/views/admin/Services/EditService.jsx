import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Image from '../../../components/Image';
import axiosClient from '../../../axiosClient';
import Loading from '../../../components/Loading';
import { useServiceContext } from '../../../context/admin/Service/ServiceContext';

const EditService = () => {

  const { service_id } = useParams();
  const { loading, getService, updateService, updating, updateServiceErrors } = useServiceContext();

  const [service, setService]   = useState({
      title:"",
      description:"",
      image:"",
  });

  const _setService = (e) => {
    setService({...service, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let service_ = getService(service_id);
      if( service_ ){
        setService({...service,...{
            title: service_.title,
            description: service_.description,
            image: service_.image
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
        <div className="row g-3">
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={service.title} onChange={(e) => _setService(e)}/>
            <div className="errors">
              {
                updateServiceErrors.hasOwnProperty('title') && updateServiceErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
              }
            </div>
          </div>
          <div className="col-md-12 mb-3">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea rows="3" className="form-control" id="description" name="description" value={service.description} onChange={(e) => _setService(e)}/>
              <div className="errors">
                {
                  updateServiceErrors.hasOwnProperty('description') && updateServiceErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                }
              </div>
          </div>
          <div className="col-md-4 mb-3">
              <label className="form-label" htmlFor='image'>Service Image</label>
              <Image image={service} setImage={setService} files="services"/> 
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
                  <>Update Service</>    
              }
          </button>
        </div>
      </>
    ) 
  }

  return ( 
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Edit Service</h5> 
        <Link to="/admin/service/index">
          <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => updateService(e, service_id, service)}>
            { output }
        </form>
      </div>
    </> 
  )
}

export default EditService