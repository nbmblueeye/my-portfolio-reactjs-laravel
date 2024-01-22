import React, { useState, useEffect} from 'react';
import Loading from '../../../../components/Loading';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Image from '../../../../components/Image';
import axiosClient from '../../../../axiosClient';
import { useAboutItemContext } from '../../../../context/admin/About/AboutItemContext';

const EditAboutItem = () => {

  let { aboutitem_id } = useParams();

  const { loading, abouts, getAboutItem, updateAboutItem, updating, updateAboutItemErrors } = useAboutItemContext();

  const [aboutItem, setAboutItem]   = useState({
    about_id: '',
    title:'',
    description:'',
    image:'',
  });

  const _setAboutItem = (e) => {
    setAboutItem({...aboutItem, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let aboutItem_ = getAboutItem(aboutitem_id);
      if( aboutItem_ ){
        setAboutItem({...aboutItem,...{
            about_id: aboutItem_.about_id,
            title:aboutItem_.title,
            description:aboutItem_.description,
            image:aboutItem_.image,
          }
        });
      }
    }
  }, [loading]);


  let output = "";
  if(loading){
    output = <Loading/>
  }else{ 
    output = 
    (
      <>
        <div className="row g-3">
            <div className="col-md-6 mb-3">
              <label className="form-label" htmlFor="title">Title</label>
              <input type="text" className="form-control"id="title" name="title" value={aboutItem.title} onChange={(e) => _setAboutItem(e)}/>
              <div className="errors">
                {
                    updateAboutItemErrors.hasOwnProperty('title') && updateAboutItemErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                }
              </div>
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <label className="form-label" htmlFor="about_id">About</label>
              <select className="form-select" aria-label="Default select" id="about_id" name="about_id" value={aboutItem.about_id} onChange={(e) => _setAboutItem(e)}>
                <option value=''>Choose a About...</option>
                {
                  abouts.length > 0 ?
                  abouts.map((about, index) => <option value={about.id} key={index}>{about.title}</option>)
                  :
                  <option>...</option>
                }
                
              </select>
              <div className="errors">
                {
                    updateAboutItemErrors.hasOwnProperty('about_id') && updateAboutItemErrors['about_id'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                }
              </div>
            </div>
            <div className="col-md-12 mb-3">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea rows="3" className="form-control" id="description" name="description" value={aboutItem.description} onChange={(e) => _setAboutItem(e)}/>
                <div className="errors">
                  {
                      updateAboutItemErrors.hasOwnProperty('description') && updateAboutItemErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                  }
                </div>
            </div>
            <div className="col-md-4 mb-3">
                <label className="form-label" htmlFor='image'>About Item Image</label>
                <Image image={aboutItem} setImage={setAboutItem} files="abouts"/> 
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
                    <>Update AboutItem</>    
                }
            </button>
        </div>
      </>
    ) 
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between">
          <h5 className="title">Edit About-Item</h5> 
          <Link to="/admin/about/item/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
          </Link>
      </div>
      <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => updateAboutItem( e, aboutitem_id, aboutItem )}>
            {
              output
            }
          </form>
      </div>
    </> 
  )
}

export default EditAboutItem
