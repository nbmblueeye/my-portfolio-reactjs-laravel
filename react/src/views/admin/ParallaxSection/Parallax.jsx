import React, { useState, useEffect} from 'react';
import Image from '../../../components/Image';
import axiosClient from '../../../axiosClient';
import { useUserContext } from '../../../context/front-end/UserContext';

const Parallax = () => {

    const userContext = useUserContext(); 
    const [errors, setErrors]     = useState([]);
    const [loading, setLoading]   = useState(false);
    const [refresh, setRefresh]  = useState(false);

    const [parallax, setParallax]   = useState({
        title:"",
        sub_title:"",
        description:"",
        image: "",
    });
  
    const _setParallax = (e) => {
        setParallax({...parallax, [e.target.name]: e.target.value});
    }

    useEffect(() =>{
        getParallax();
        return () => {
           setRefresh(false);
        }
    }, [refresh]);
  
    const getParallax = async() => {
        setLoading(true);
        await axiosClient.get('/admin/parallax')
        .then(res =>{
            if(res && res.status == 200){
              setLoading(false);
              let { data } = res.data;
              if(data){
                setParallax({...parallax,...{
                  title: data.title,
                  sub_title: data.sub_title ? data.sub_title:"",
                  description: data.description ? data.description:"",
                  image: data.image ? data.image:"",
                }});
                setImage(data.image);
              }
            }    
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        })
    }
    
    const AddParallax = async(e) => {
        e.preventDefault();
        setLoading(true);
        let parallaxForm = new FormData();
        parallaxForm.append('title', parallax.title);
        parallaxForm.append('sub_title', parallax.sub_title);
        parallaxForm.append('description', parallax.description);
        parallaxForm.append('image', parallax.image ?  parallax.image:"");
    
        await axiosClient.post('/admin/parallax', parallaxForm)
        .then(res => {
          setLoading(false);
          if(res.status == 201){
            setErrors([]);
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            setTimeout(() => {
                setRefresh(true);
            }, 2200);
          }else if(res.status == 202){
            setErrors([]);
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            setTimeout(() => {
                setRefresh(true);
            }, 2200);
          } 
        })
        .catch(({response}) => { 
            setLoading(false);
            if(response){
                if(response.status == 422){
                    setErrors(response.data.errors);
                }
                console.log(response);
            }
        })
    }

  return (
    
    <div className="card shadow my_portfolio_section mx-auto">
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Parallax Section</h5> 
        <div></div>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => AddParallax(e)}>
            <div className="row g-3">
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={parallax.title} onChange={(e) => _setParallax(e)}/>
                <div className="errors">
                  {
                    errors.hasOwnProperty('title') && errors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                  }
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="sub_title">Sub_Title</label>
                <input type="text" className="form-control" id="sub_title" name="sub_title" value={parallax.sub_title} onChange={(e) => _setParallax(e)}/>
                <div className="errors">
                  {
                    errors.hasOwnProperty('sub_title') && errors['sub_title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                  }
                </div>
              </div>
              <div className="col-md-12 mb-3">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea rows="3" className="form-control" id="description" name="description" value={parallax.description} onChange={(e) => _setParallax(e)}/>
                    <div className="errors">
                      {
                        errors.hasOwnProperty('description') && errors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor='image'>Parallax Image</label>
                    <Image image={parallax} setImage={setParallax} files="parallaxs"/>
                    <div className="errors">
                      {
                        errors.hasOwnProperty('image') && errors['image'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                </div>
            </div>
            {
              userContext.user.role == "Admin" &&
              <div className="mt-5">
                  <button type="submit" disabled={loading ? true:false} className="btn btn-primary float-end">
                    {
                      loading ?
                      (
                          <div className="spinner-border text-success" role="status">
                              <span className="visually-hidden">Adding...</span>
                          </div>
                      )
                      :  
                      !parallax.title ?<>Add Parallax</>:<>Update Parallax</>   
                    }
                  </button>
              </div>
            }
        </form>
      </div>
    </div> 
    
  )
}

export default Parallax