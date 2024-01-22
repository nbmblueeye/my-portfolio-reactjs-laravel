import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../../components/Image';
import { useServiceItemContext } from '../../../../context/admin/Service/ServiceItemContext';

const AddServiceItem = () => {

  const { services, addServiceItemErrors, addServiceItem, adding, refresh, setRefresh, } = useServiceItemContext();

  const [service_item, setService_Item] = useState({
      service_id:"",
      title:"",
      link:"",
      description:"",
      image:"",
  });

  const _setService_Item = (e) => {
    setService_Item({...service_item, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(refresh){
      setTimeout(() => {
        setService_Item({
          service_id:"",
          title:"",
          link:"",
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
          <h5 className="title">Add Service Item</h5> 
          <Link to="/admin/service/item/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
          </Link>
      </div>
      <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => addServiceItem(e, service_item)}>
            <div className="row gap-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={service_item.title} onChange={(e) => _setService_Item(e)}/>
                  <div className="errors">
                    {
                      addServiceItemErrors.hasOwnProperty('title') && addServiceItemErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="row g-3">
                      <div className="col-md-6">
                          <label className="form-label" htmlFor="link">Link</label>
                          <input type="text" className="form-control" id="link" name="link" value={service_item.link} onChange={(e) => _setService_Item(e)}/>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="service_id">Service</label>
                        <select className="form-select" id="service_id" name="service_id" value={service_item.service_id} onChange={(e) => _setService_Item(e)}>
                          <option value=''>Choose a Service...</option>
                          {
                            services.length > 0 ?
                            services.map((service, index) => <option value={service.id} key={index}>{service.title}</option>)
                            :
                            <option>...</option>
                          }
                        </select>
                        <div className="errors">
                          {
                            addServiceItemErrors.hasOwnProperty('service_id') && addServiceItemErrors['service_id'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                          }
                        </div>
                      </div>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                      <label className="form-label" htmlFor="description">Description</label>
                      <textarea rows="3" className="form-control" id="description" name="description" value={service_item.description} onChange={(e) => _setService_Item(e)}/>
                      <div className="errors">
                        {
                            addServiceItemErrors.hasOwnProperty('description') && addServiceItemErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor='image'>Qualification Detail Image</label>
                    <Image image={service_item} setImage={setService_Item} files="services/service-items"/> 
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
                        <>Add Service_Item</>    
                    }
                </button>
            </div>
          </form>
      </div>
    </> 
  )
}

export default AddServiceItem