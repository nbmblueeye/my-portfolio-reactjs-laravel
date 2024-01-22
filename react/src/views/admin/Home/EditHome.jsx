import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Image from '../../../components/Image';
import axiosClient from '../../../axiosClient';
import { useHomeContext } from '../../../context/admin/Home/HomeContext';

const EditHome = () => {

  let { home_id } = useParams();
  
  const { getHome, updateHome, loading, updateHomeErrors ,updating } = useHomeContext();

  const [home, setHome]   = useState({
    title:'',
    sub_title:'',
    message:'',
    image:'',
    facebook_url:'',
    linkedin_url:'',
    instagram_url:'',
    youtube_url:'',
    button_text:'',
    button_url:'',
  });

  const _setHome = (e) => {
    setHome({...home, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let home_ = getHome( home_id );
      if(home_){
        setHome({...home,...{
          title: home_.title,
          sub_title: home_.sub_title,
          message: home_.message,
          image: home_.image ? home_.image:"",
          facebook_url: home_.facebook_url,
          linkedin_url: home_.linkedin_url,
          instagram_url: home_.instagram_url,
          youtube_url: home_.youtube_url,
          button_text: home_.button_text,
          button_url: home_.button_url,
        }});
      }
    }
  }, [loading]);

  let output = "";
  if(loading){
    output = <Loading/>
  }else{ 
      output =(
        <>
          <nav className='mb-5'>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <button className="nav-link active" id="nav-information-tab" data-bs-toggle="tab" data-bs-target="#nav-information" type="button" role="tab" aria-controls="nav-information" aria-selected="true">Information</button>
              <button className="nav-link" id="nav-media-tab" data-bs-toggle="tab" data-bs-target="#nav-media" type="button" role="tab" aria-controls="nav-media" aria-selected="false">Media</button>
              <button className="nav-link" id="nav-viewmore-tab" data-bs-toggle="tab" data-bs-target="#nav-viewmore" type="button" role="tab" aria-controls="nav-viewmore" aria-selected="false">View More Button</button>
            </div>
          </nav>
          <div className="tab-content" id="nav-tabContent">
            <div className="tab-pane fade show active" id="nav-information" role="tabpanel" aria-labelledby="nav-information-tab" tabIndex="0">
              <div className="row g-3">
                <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor='title'>Title</label>
                    <input type="text" className="form-control" id='title' name="title" value={home.title} onChange={(e) => _setHome(e)}/>
                    <div className="errors">
                      {
                          updateHomeErrors.hasOwnProperty('title') && updateHomeErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor='sub_title'>Sub_Title</label>
                    <input type="text" className="form-control" id='sub_title' name="sub_title" value={home.sub_title} onChange={(e) => _setHome(e)}/>
                    <div className="errors">
                      {
                          updateHomeErrors.hasOwnProperty('sub_title') && updateHomeErrors['sub_title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                </div>
                <div className="col-md-12 mb-3">
                    <label className="form-label" htmlFor='message'>Message</label>
                    <textarea rows="3" className="form-control" id='message' name="message" value={home.message} onChange={(e) => _setHome(e)}/>
                    <div className="errors">
                      {
                          updateHomeErrors.hasOwnProperty('message') && updateHomeErrors['message'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <p className="form-label mb-3">Home Page Image</p>
                    <Image image={home} setImage={setHome} files="homes"/> 
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="nav-media" role="tabpanel" aria-labelledby="nav-media-tab" tabIndex="0">
                <div className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor='facebook_url'>FaceBook Url</label>
                    <input type="text" className="form-control" id='facebook_url' name="facebook_url" value={home.facebook_url} onChange={(e) => _setHome(e)}/>
                    <div className="errors">
                      {
                          updateHomeErrors.hasOwnProperty('facebook_url') && updateHomeErrors['facebook_url'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor='linkedin_url'>LinkedIn Url</label>
                    <input type="text" className="form-control" id='linkedin_url' name="linkedin_url" value={home.linkedin_url} onChange={(e) => _setHome(e)}/>
                    <div className="errors">
                      {
                          updateHomeErrors.hasOwnProperty('linkedin_url') && updateHomeErrors['linkedin_url'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor='instagram_url'>Instagram Url</label>
                    <input type="text" className="form-control" id='instagram_url' name="instagram_url" value={home.instagram_url} onChange={(e) => _setHome(e)}/>
                    <div className="errors">
                      {
                          updateHomeErrors.hasOwnProperty('instagram_url') && updateHomeErrors['instagram_url'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor='youtube_url'>YouTube Url</label>
                    <input type="text" className="form-control" id='youtube_url' name="youtube_url" value={home.youtube_url} onChange={(e) => _setHome(e)}/>
                    <div className="errors">
                      {
                          updateHomeErrors.hasOwnProperty('youtube_url') && updateHomeErrors['youtube_url'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
                
                
                </div>
            </div>
            <div className="tab-pane fade" id="nav-viewmore" role="tabpanel" aria-labelledby="nav-viewmore-tab" tabIndex="0">
              <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor='button_text'>Button Text</label>
                    <input type="text" className="form-control" id="button_text" name="button_text" value={home.button_text} onChange={(e) => _setHome(e)}/>
                    <div className="errors">
                      {
                          updateHomeErrors.hasOwnProperty('button_text') && updateHomeErrors['button_text'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor='button_url'>Button Url</label>
                    <input type="text" className="form-control" id='button_url' name="button_url" value={home.button_url} onChange={(e) => _setHome(e)}/>
                    <div className="errors">
                      {
                          updateHomeErrors.hasOwnProperty('button_url') && updateHomeErrors['button_url'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
                  <div className="col-md-12 mt-5">
                    <button type="submit" disabled={updating ? true:false} className="btn btn-primary float-end">
                      {
                          updating ?
                          (
                              <div className="spinner-border text-success" role="status">
                                  <span className="visually-hidden">Updating...</span>
                              </div>
                          )
                          :
                          <>Update Home Page Information</>    
                      }
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </>
      );             
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between">
          <h5 className="title">Update Home Page Information</h5> 
          <Link to="/admin/home/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
          </Link>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => updateHome(e, home_id ,home)}>
          {
            output
          }
        </form> 
      </div>
    </>
  )
}

export default EditHome
