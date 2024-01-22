import React, { useState, useEffect } from 'react';
import Image from '../../../../components/Image';
import { Link } from 'react-router-dom';
import { useQualificationDetailContext } from '../../../../context/admin/Qualification/QualificationDetailContext';

const AddQualificationDetail = () => {
  const { qualification_items, addQualificationDetailErrors , addQualificationDetail , adding, refresh, setRefresh, } = useQualificationDetailContext();
  
  const [qualification_detail, setQualification_Detail]     = useState({
      qualification_item_id:"",
      title:"",
      link:"",
      description:"",
      image:"",
  });

  const _setQualification_Detail = (e) => {
    setQualification_Detail({...qualification_detail, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(refresh){
      setTimeout(() => {
        setQualification_Detail({
          qualification_item_id:"",
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
          <h5 className="title">Add Qualification-Detail</h5> 
          <Link to="/admin/qualification/detail/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
          </Link>
      </div>
      <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => addQualificationDetail(e, qualification_detail)}>
            <div className="row gap-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={qualification_detail.title} onChange={(e) => _setQualification_Detail(e)}/>
                  <div className="errors">
                    {
                        addQualificationDetailErrors.hasOwnProperty('title') && addQualificationDetailErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
                </div>

                <div className="col-md-12 mb-3">
                  <div className="row g-3">
                      <div className="col-md-6">
                          <label className="form-label" htmlFor="link">Link</label>
                          <input type="text" className="form-control" id="link" name="link" value={qualification_detail.link} onChange={(e) => _setQualification_Detail(e)}/>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label" htmlFor="qualification_item_id">Qualification Item</label>
                        <select className="form-select" id="qualification_item_id" name="qualification_item_id" value={qualification_detail.qualification_item_id} onChange={(e) => _setQualification_Detail(e)}>
                          <option value=''>Choose a Qualification...</option>
                          {
                            qualification_items.length > 0 ?
                            qualification_items.map((qualification_item, index) => <option value={qualification_item.id} key={index}>{qualification_item.title}</option>)
                            :
                            <option>...</option>
                          }
                        </select>
                        <div className="errors">
                          {
                            addQualificationDetailErrors.hasOwnProperty('qualification_item_id') && addQualificationDetailErrors['qualification_item_id'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                          }
                        </div>
                      </div>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                      <label className="form-label" htmlFor="description">Description</label>
                      <textarea rows="3" className="form-control" id="description" name="description" value={qualification_detail.description} onChange={(e) => _setQualification_Detail(e)}/>
                      <div className="errors">
                        {
                            addQualificationDetailErrors.hasOwnProperty('description') && addQualificationDetailErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor='image'>Qualification Detail Image</label>
                    <Image image={qualification_detail} setImage={setQualification_Detail} files="qualifications/qualification-details"/> 
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
                        <>Add Qualification_Detail</>    
                    }
                </button>
            </div>
          </form>
      </div>
    </> 
  )
}

export default AddQualificationDetail