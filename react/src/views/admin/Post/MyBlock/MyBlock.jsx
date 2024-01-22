import React, { useState, useEffect} from 'react';
import Image from '../../../../components/Image';
import axiosClient from '../../../../axiosClient';
import { useUserContext } from '../../../../context/front-end/UserContext';

const MyBlock = () => {

    const userContext = useUserContext();
    const [errors, setErrors]    = useState([]);
    const [loading, setLoading]  = useState(false);
    const [refresh, setRefresh]  = useState(false);

    const [myBlock, setMyBlock]  = useState({
      title:"",
      sub_title:"",
      description:"",
      image:"",
    });

    const _setMyBlock = (e) => {
      setMyBlock({...myBlock, [e.target.name]: e.target.value});
    }

    useEffect(() =>{
      getMyBlock();
      return () => {
          setRefresh(false);
      }
      
    }, [refresh]);
  
    const getMyBlock = async() => {
      setLoading(true);
      await axiosClient.get('/admin/my-block')
      .then(res =>{
          if(res && res.status == 200){
            setLoading(false);
            let { data } = res.data;
            if(data){
              setMyBlock({...myBlock,...{
                title: data.title,
                sub_title: data.sub_title ? data.sub_title:"",
                description: data.description ? data.description:"",
                image: data.image ? data.image:""
              }});
            }
          }    
      })
      .catch(error => {
          setLoading(false);
          if(error){
            console.log(error);
          } 
      })
    }

    const addMyBlock = async(e) => {
      e.preventDefault();
      setLoading(true);
      let myBlockForm = new FormData();
      myBlockForm.append('title', myBlock.title);
      myBlockForm.append('sub_title', myBlock.sub_title);
      myBlockForm.append('description', myBlock.description);
      myBlockForm.append('image', myBlock.image);
  
      await axiosClient.post('/admin/my-block', myBlockForm)
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
          <h5 className="title">My Block Section</h5> 
          <div></div>
        </div>
        <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => addMyBlock(e)}>
              <div className="row g-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" name="title" value={myBlock.title} onChange={(e) => _setMyBlock(e)}/>
                  <div className="errors">
                    {
                      errors.hasOwnProperty('title') && errors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Sub_Title</label>
                  <input type="text" className="form-control" name="sub_title" value={myBlock.sub_title} onChange={(e) => _setMyBlock(e)}/>
                  <div className="errors">
                    {
                      errors.hasOwnProperty('sub_title') && errors['sub_title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                      <label className="form-label">Description</label>
                      <textarea rows="3" className="form-control" name="description" value={myBlock.description} onChange={(e) => _setMyBlock(e)}/>
                      <div className="errors">
                        {
                          errors.hasOwnProperty('description') && errors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-4 mb-3">
                      <label className="form-label">My Block Image</label>
                      <Image image={ myBlock } setImage={ setMyBlock } files="myblocks"/>
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
                    <button type="submit" className="btn btn-primary float-end">
                      {
                        loading ?
                        (
                            <div className="spinner-border text-success" role="status">
                                {!myBlock.title ? <span className="visually-hidden">Adding...</span>:<span className="visually-hidden">Updating...</span>}
                            </div>
                        )
                        :  
                        !myBlock.title && !myBlock.image?<>Add My Block</>:<>Update My Block</>   
                      }
                    </button>
                </div>
              }
          </form>
        </div>
    </div> 
  )
}

export default MyBlock