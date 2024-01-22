import React, {  useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import axiosClient from '../../../axiosClient';
import Image from '../../../components/Image';
import { useAboutContext } from '../../../context/admin/About/AboutContext';

const EditAbout = () => {

  const { about_id } = useParams();
  const { loading, getAbout, updateAbout, updating, updateAboutErrors } = useAboutContext();

  const [about, setAbout]       = useState({
      title:"",
      sub_title:"",
      introduction:"",
      image:""
  });

  const _setAbout = (e) => {
      setAbout({...about, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let about_ = getAbout(about_id);
      if( about_ ){
        setAbout({...about,...{
            title:about_.title,
            sub_title:about_.sub_title,
            introduction:about_.introduction,
            image:about_.image
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
            <label className="form-label">Title</label>
            <input type="text" className="form-control" name="title" value={about.title} onChange={(e) => _setAbout(e)}/>
            <div className="errors">
                {
                 updateAboutErrors.hasOwnProperty('title') &&  updateAboutErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                }
            </div>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Sub_Title</label>
            <input type="text" className="form-control" name="sub_title" value={about.sub_title} onChange={(e) => _setAbout(e)}/>
            <div className="errors">
                {
                 updateAboutErrors.hasOwnProperty('sub_title') &&  updateAboutErrors['sub_title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                }
            </div>
          </div>
          <div className="col-md-12 mb-3">
            <label className="form-label">Introduction</label>
            <textarea rows="3" className="form-control" name="introduction" value={about.introduction} onChange={(e) => _setAbout(e)}/>
            <div className="errors">
            {
                 updateAboutErrors.hasOwnProperty('introduction') &&  updateAboutErrors['introduction'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
            }
            </div>
          </div>
          <div className="col-md-4 mb-3">
              <label className="form-label">About Image</label>
              <Image image={about} setImage={setAbout} files="abouts"/>
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
                    <>Update About</>    
                  }
              </button>
        </div>
      </>
    ) 
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between">
          <h5 className="title">Update About Page Information</h5> 
          <Link to="/admin/about/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
          </Link>
      </div>
      <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => updateAbout(e, about_id, about)}>
              { output }
          </form>
      </div>
  </> 
  )
}

export default EditAbout
