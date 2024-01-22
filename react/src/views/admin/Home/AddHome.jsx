import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Image from '../../../components/Image';
import { useHomeContext } from '../../../context/admin/Home/HomeContext';

const AddHome = () => {

  const { adding , addHome, addHomeErrors , refresh, setRefresh } = useHomeContext();

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

  useEffect(() => {
    if(refresh){
      setTimeout(() => {
        setHome({...home,...{
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
        }});
      }, 2000)
    };
    return () => setRefresh(false);
  }, [refresh])

  return (
    <>
      <div className="card-header d-flex justify-content-between">
          <h5 className="title">Add Home Page Information</h5> 
          <Link to="/admin/home/index" >
            <button className='btn btn-primary float-end p-2'>Back</button>
          </Link>
      </div>
      <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => addHome(e, home)}>
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
                      <input type="text" className="form-control" id="title" name="title" value={home.title} onChange={(e) => _setHome(e)}/>
                      <div className="errors">
                        {
                            addHomeErrors.hasOwnProperty('title') && addHomeErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor='sub_title'>Sub_Title</label>
                      <input type="text" className="form-control" id="sub_title" name="sub_title" value={home.sub_title} onChange={(e) => _setHome(e)}/>
                      <div className="errors">
                        {
                            addHomeErrors.hasOwnProperty('sub_title') && addHomeErrors['sub_title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-12 mb-3">
                      <label className="form-label" htmlFor='message'>Message</label>
                      <textarea rows="3" className="form-control" id="message" name="message" value={home.message} onChange={(e) => _setHome(e)}/>
                      <div className="errors">
                        {
                            addHomeErrors.hasOwnProperty('message') && addHomeErrors['message'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
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
                      <input type="text" className="form-control" id="facebook_url" name="facebook_url" value={home.facebook_url} onChange={(e) => _setHome(e)}/>
                      <div className="errors">
                        {
                            addHomeErrors.hasOwnProperty('facebook_url') && addHomeErrors['facebook_url'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor='linkedin_url'>LinkedIn Url</label>
                      <input type="text" className="form-control" id='linkedin_url' name="linkedin_url" value={home.linkedin_url} onChange={(e) => _setHome(e)}/>
                      <div className="errors">
                        {
                            addHomeErrors.hasOwnProperty('linkedin_url') && addHomeErrors['linkedin_url'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor='instagram_url'>Instagram Url</label>
                      <input type="text" className="form-control" id="instagram_url" name="instagram_url" value={home.instagram_url} onChange={(e) => _setHome(e)}/>
                      <div className="errors">
                        {
                            addHomeErrors.hasOwnProperty('instagram_url') && addHomeErrors['instagram_url'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor='youtube_url'>YouTube Url</label>
                      <input type="text" className="form-control" id='youtube_url' name="youtube_url" value={home.youtube_url} onChange={(e) => _setHome(e)}/>
                      <div className="errors">
                        {
                            addHomeErrors.hasOwnProperty('youtube_url') && addHomeErrors['youtube_url'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                    </div>
                  </div>
              </div>
              <div className="tab-pane fade" id="nav-viewmore" role="tabpanel" aria-labelledby="nav-viewmore-tab" tabIndex="0">
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label" htmlFor='button_text'>Button Text</label>
                      <input type="text" className="form-control" id='button_text' name="button_text" value={home.button_text} onChange={(e) => _setHome(e)}/>
                      <div className="errors">
                        {
                            addHomeErrors.hasOwnProperty('button_text') && addHomeErrors['button_text'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor='button_url'>Button Url</label>
                      <input type="text" className="form-control" id='button_url' name="button_url" value={home.button_url} onChange={(e) => _setHome(e)}/>
                      <div className="errors">
                        {
                            addHomeErrors.hasOwnProperty('button_url') && addHomeErrors['button_url'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                    </div>
                    <div className="col-md-12 mt-5">
                      <button type="submit" disabled={adding ? true:false} className="btn btn-primary float-end d-flex align-items-center justify-content-center p-2">
                        {
                            adding ?
                            (
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Adding...</span>
                                </div>
                            )
                            :
                            <>Add Home Page Information</>    
                        }
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </form>
      </div>
    </>
  )
}

export default AddHome
