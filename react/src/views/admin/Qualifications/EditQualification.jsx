import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Image from '../../../components/Image';
import axiosClient from '../../../axiosClient';
import Loading from '../../../components/Loading';
import { useQualificationContext } from '../../../context/admin/Qualification/QualificationContext';

const EditQualification = () => {

  const { qualification_id } = useParams();
  const { loading, getQualification, updateQualification, updating,  updateQualificationErrors } = useQualificationContext();

  const [qualification, setQualification]     = useState({
      title:"",
      description:"",
      image:""
  });

  const _setQualification = (e) => {
    setQualification({...qualification, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let qualificationItem_ =  getQualification(qualification_id);
      if( qualificationItem_ ){
        setQualification({...qualification,...{
          title: qualificationItem_.title,
          description: qualificationItem_.description,
          image: qualificationItem_.image
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
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={qualification.title} onChange={(e) => _setQualification(e)}/>
                    <div className="errors">
                      {
                        updateQualificationErrors.hasOwnProperty('title') && updateQualificationErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Description</label>
                    <textarea rows="3" className="form-control" name="description" value={qualification.description} onChange={(e) => _setQualification(e)}/>
                    <div className="errors">
                      {
                        updateQualificationErrors.hasOwnProperty('description') && updateQualificationErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                      <label className="form-label">Qualification Image</label>
                      <Image image={qualification} setImage={setQualification} files="qualifications"/> 
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
                      <>Update Qualification</>    
                    }
                  </button>
                </div>
              </>
            )     
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Edit Qualification</h5> 
        <Link to="/admin/qualification/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => updateQualification( e, qualification_id, qualification )}>
            { output }
        </form>
      </div>
    </> 
  )
}

export default EditQualification