import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/Image';
import { useQualificationContext } from '../../../context/admin/Qualification/QualificationContext';

const AddQualification = () => {

  const { addQualificationErrors , addQualification, adding, refresh, setRefresh, } = useQualificationContext();

  const [qualification, setQualification]     = useState({
      title:"",
      description:"",
      image:""
  });

  const _setQualification = (e) => {
    setQualification({...qualification, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(refresh){
      setTimeout(() => {
        setQualification({
          title:"",
          description:"",
          image:""
        })
      }, 2000)
    };
    return () => setRefresh(false);
  }, [refresh])


  return (  
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Add New Qualification</h5> 
        <Link to="/admin/qualification/index">
          <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => addQualification(e, qualification)}>
            <div className="row gap-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" name="title" value={qualification.title} onChange={(e) => _setQualification(e)}/>
                  <div className="errors">
                    {
                      addQualificationErrors.hasOwnProperty('title') && addQualificationErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                      <label className="form-label">Description</label>
                      <textarea rows="3" className="form-control" name="description" value={qualification.description} onChange={(e) => _setQualification(e)}/>
                      <div className="errors">
                        {
                          addQualificationErrors.hasOwnProperty('description') && addQualificationErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-4 mb-3">
                      <label className="form-label">Qualification Image</label>
                      <Image image={qualification} setImage={setQualification} files="qualifications"/> 
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
                    <>Add New Qualification</>    
                  }
                </button>
            </div>
        </form>
      </div>
    </> 
  )
}

export default AddQualification