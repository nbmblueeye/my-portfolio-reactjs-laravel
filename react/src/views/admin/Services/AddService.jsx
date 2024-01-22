import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/Image';
import { useServiceContext } from '../../../context/admin/Service/ServiceContext';

const AddService = () => {

  const { addServiceErrors , addService, adding, refresh, setRefresh, } = useServiceContext();

  const [service, setService]   = useState({
      title:"",
      description:"",
      image:"",
  });

  const _setService = (e) => {
    setService({...service, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(refresh){
      setTimeout(() => {
        setService({
          title:"",
          description:"",
          image:"",
        })
      }, 2000)
    };
    return () => setRefresh(false);
  }, [refresh])

  return ( 
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Add New Service</h5> 
        <Link to="/admin/service/index">
          <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => addService(e, service)}>
            <div className="row g-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={service.title} onChange={(e) => _setService(e)}/>
                  <div className="errors">
                    {
                      addServiceErrors.hasOwnProperty('title') && addServiceErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                      <label className="form-label" htmlFor="description">Description</label>
                      <textarea rows="3" className="form-control" id="description" name="description" value={service.description} onChange={(e) => _setService(e)}/>
                      <div className="errors">
                        {
                          addServiceErrors.hasOwnProperty('description') && addServiceErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-4 mb-3">
                      <label className="form-label" htmlFor='image'>Service Image</label>
                      <Image image={service} setImage={setService} files="services"/> 
                </div>
            </div>
            <div className="mt-5">
                <button type="submit" disabled={adding ? true:false} className="btn btn-primary float-end">
                    {
                        adding ?
                        (
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Adding...</span>
                            </div>
                        )
                        :
                        <>Add New Service</>    
                    }
                </button>
            </div>
        </form>
      </div>
    </> 
  )
}

export default AddService