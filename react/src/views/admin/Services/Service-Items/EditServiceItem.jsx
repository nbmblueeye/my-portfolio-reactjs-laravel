import React, { useState, useEffect} from 'react';
import Loading from '../../../../components/Loading';
import { useParams, Link } from 'react-router-dom';
import Image from '../../../../components/Image';
import { useServiceItemContext } from '../../../../context/admin/Service/ServiceItemContext';

const EditServiceItem = () => {

  let { service_item_id } = useParams();

  const { loading, services, getServiceItem, updateServiceItem, updating, updateServiceItemErrors } = useServiceItemContext();

  const [service_item, setService_Item]     = useState({
      service_id:"",
      title:"",
      link:"",
      description:"",
      image:"",
  });

  const _setService_Item = (e) => {
    setService_Item({...service_item, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let serviceItem_ = getServiceItem( service_item_id );
      if( serviceItem_ ){
        setService_Item({...service_item,...{
            service_id: serviceItem_.service_id,
            title: serviceItem_.title,
            link: serviceItem_.link,
            description: serviceItem_.description,
            image: serviceItem_.image,
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
        <div className="row gap-3">
            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="title">Title</label>
              <input type="text" className="form-control" id="title" name="title" value={service_item.title} onChange={(e) => _setService_Item(e)}/>
              <div className="errors">
                {
                  updateServiceItemErrors.hasOwnProperty('title') && updateServiceItemErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                }
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="row g-3">
                  <div className="col-md-6">
                      <label className="form-label" htmlFor="link" >Link</label>
                      <input type="text" className="form-control" id="link" name="link" value={service_item.link} onChange={(e) => _setService_Item(e)}/>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Service</label>
                    <select className="form-select" name="service_id" value={service_item.service_id} onChange={(e) => _setService_Item(e)}>
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
                        updateServiceItemErrors.hasOwnProperty('service_id') && updateServiceItemErrors['service_id'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
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
                        updateServiceItemErrors.hasOwnProperty('description') && updateServiceItemErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
            </div>
            <div className="col-md-4 mb-3">
                <label className="form-label" htmlFor='image'>Qualification Detail Image</label>
                <Image image={service_item} setImage={setService_Item} files="services/service-items"/> 
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
                  <>Update Service_Item</>    
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
        <Link to="/admin/service/item/index">
          <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => updateServiceItem( e, service_item_id, service_item )}>
            {
              output
            }
          </form>
      </div>
    </> 
  )
}

export default EditServiceItem