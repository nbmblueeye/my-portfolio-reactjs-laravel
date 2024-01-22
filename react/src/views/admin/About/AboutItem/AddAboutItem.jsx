import React, { useState, useEffect } from 'react';
import Image from '../../../../components/Image';
import { Link } from 'react-router-dom';
import { useAboutItemContext } from '../../../../context/admin/About/AboutItemContext';

const AddAboutItem = () => {

  const { abouts, addAboutItemErrors , addAboutItem, adding, refresh, setRefresh, } = useAboutItemContext();

  const [aboutItem, setAboutItem]   = useState({
    about_id: '',
    title:'',
    description:'',
    image:'',
  });

  const _setAboutItem = (e) => {
    setAboutItem({...aboutItem, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(refresh){
      setTimeout(() => {
        setAboutItem({
          about_id: '',
          title:'',
          description:'',
          image:'',
        })
      }, 2000)
    };
    return () => setRefresh(false);
  }, [refresh])

 
  return (
    <>
      <div className="card-header d-flex justify-content-between">
          <h5 className="title">Add About-Item</h5> 
          <Link to="/admin/about/item/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
          </Link>
      </div>
      <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => addAboutItem(e, aboutItem)}>
              <div className="row g-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor='title'>Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={aboutItem.title} onChange={(e) => _setAboutItem(e)}/>
                    <div className="errors">
                      {
                          addAboutItemErrors.hasOwnProperty('title') && addAboutItemErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 mb-3">
                    <label className="form-label" htmlFor="about_id">About</label>
                    <select className="form-select" aria-label="Default select" id="about_id" name="about_id" value={aboutItem.about_id} onChange={(e) => _setAboutItem(e)}>
                      <option value=''>Choose a About Item...</option>
                      {
                        abouts.length > 0 ?
                        abouts.map((about, index) => <option value={about.id} key={index}>{about.title}</option>)
                        :
                        <option>...</option>
                      }
                    </select>
                    <div className="errors">
                      {
                        addAboutItemErrors.hasOwnProperty('about_id') && addAboutItemErrors['about_id'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                      <label className="form-label" htmlFor="description">Description</label>
                      <textarea rows="3" className="form-control" id="description" name="description" value={aboutItem.description} onChange={(e) => _setAboutItem(e)}/>
                      <div className="errors">
                        {
                          addAboutItemErrors.hasOwnProperty('description') && addAboutItemErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-4 mb-3">
                      <label className="form-label" htmlFor='image'>About Item Image</label>
                      <Image image={aboutItem} setImage={setAboutItem} files="abouts"/> 
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
                    <>Add AboutItem</>    
                  }
                </button>
              </div>
          </form>
      </div>
    </> 
  )
}

export default AddAboutItem