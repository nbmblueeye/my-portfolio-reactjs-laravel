import React, { useState, useEffect } from 'react';
import Image from '../../../../components/Image';
import { Link } from 'react-router-dom';
import { useQualificationItemContext } from '../../../../context/admin/Qualification/QualificationItemContext';

const AddQualificationItem = () => {

  const { qualifications, addQualificationItemErrors , addQualificationItem , adding, refresh, setRefresh, } = useQualificationItemContext();

  const [qualification_item, setQualification_Item]     = useState({
      qualification_id:"",
      title:"",
      description:"",
      image: ""
  });

  const _setQualification_Item = (e) => {
    setQualification_Item({...qualification_item, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(refresh){
      setTimeout(() => {
        setQualification_Item({
          qualification_id:"",
          title:"",
          description:"",
          image: ""
        })
      }, 2000)
    };
    return () => setRefresh(false);
  }, [refresh])

  return (
    <>
      <div className="card-header d-flex justify-content-between">
          <h5 className="title">Add Qualification-Item</h5> 
          <Link to="/admin/qualification/item/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
          </Link>
      </div>
      <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => addQualificationItem(e, qualification_item)}>
            <div className="row gap-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={qualification_item.title} onChange={(e) => _setQualification_Item(e)}/>
                  <div className="errors">
                    {
                        addQualificationItemErrors.hasOwnProperty('title') && addQualificationItemErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label" htmlFor="qualification_id">Qualification</label>
                  <select className="form-select" id="qualification_id" name="qualification_id" value={qualification_item.qualification_id} onChange={(e) => _setQualification_Item(e)}>
                    <option value=''>Choose a Qualification...</option>
                    {
                      qualifications.length > 0 ?
                      qualifications.map((qualification, index) => <option value={qualification.id} key={index}>{qualification.title}</option>)
                      :
                      <option>...</option>
                    }
                  </select>
                  <div className="errors">
                    {
                      addQualificationItemErrors.hasOwnProperty('qualification_id') && addQualificationItemErrors['qualification_id'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                      <label className="form-label" htmlFor="description">Description</label>
                      <textarea rows="3" className="form-control" id="description" name="description" value={qualification_item.description} onChange={(e) => _setQualification_Item(e)}/>
                      <div className="errors">
                        {
                            addQualificationItemErrors.hasOwnProperty('description') && addQualificationItemErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-4 mb-3" htmlFor="image">
                      <label className="form-label">Qualification Item Image</label>
                      <Image image={qualification_item} setImage={setQualification_Item} files="qualifications/qualification-items"/> 
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
                        <>Add Qualification_Item</>    
                    }
                </button>
            </div>
          </form>
      </div>
    </> 
  )
}
export default AddQualificationItem