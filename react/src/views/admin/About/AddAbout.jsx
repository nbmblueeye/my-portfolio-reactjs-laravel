import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import Image from '../../../components/Image';
import { useAboutContext } from '../../../context/admin/About/AboutContext';

const AddAbout = () => {

    const { addAbout, adding, addAboutErrors , refresh, setRefresh } = useAboutContext();
    const [about, setAbout] = useState({
            title:"",
            sub_title:"",
            introduction:"",
            image:""
    });

    const _setAbout = (e) => {
        setAbout({...about, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(refresh){
          setTimeout(() => {
            setAbout({
                title:"",
                sub_title:"",
                introduction:"",
                image:""
            })
          }, 2000)
        };
        return () => setRefresh(false);
    }, [refresh])
    

  return (
      <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Add About Page Information</h5> 
            <Link to="/admin/about/index">
                <button className='btn btn-primary float-end p-2'>Back</button>
            </Link>
        </div>
        <div className="card-body ">
            <form autoComplete='off' onSubmit={(e) => addAbout(e, about)}>
                <div className="row g-3">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" value={about.title} onChange={(e) => _setAbout(e)}/>
                        <div className="errors">
                            {
                                addAboutErrors.hasOwnProperty('title') && addAboutErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                            }
                        </div>
                    </div>
                    <div className="col-12 mb-3">
                        <label className="form-label">Sub_Title</label>
                        <input type="text" className="form-control" name="sub_title" value={about.sub_title} onChange={(e) => _setAbout(e)}/>
                        <div className="errors">
                            {
                                addAboutErrors.hasOwnProperty('sub_title') && addAboutErrors['sub_title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                            }
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Introduction</label>
                        <textarea rows="3" className="form-control" name="introduction" value={about.introduction} onChange={(e) => _setAbout(e)}/>
                        <div className="errors">
                            {
                                addAboutErrors.hasOwnProperty('introduction') && addAboutErrors['introduction'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                            }
                        </div>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label className="form-label">About Image</label>
                        <Image image={ about } setImage={ setAbout } files="abouts"/>
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
                            <>Add New About</>    
                        }
                    </button>
                </div>
            </form>
        </div>
      </> 
  )
}

export default AddAbout
