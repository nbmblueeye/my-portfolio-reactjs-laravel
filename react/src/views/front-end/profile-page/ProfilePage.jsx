import React, { useEffect, useState,} from 'react'
import axiosClient from '../../../axiosClient';
import Image from '../../../components/Image';
import { useUserContext } from '../../../context/front-end/UserContext';
import PageLoading from '../../../components/PageLoading';

const ProfilePage = () => {

  const [user, setUser] = useState({
    name:"",
    email:"",
    phone:"",
    pin_code:"",
    address:"",
    image:""
  });
  const [errors, setErrors]   = useState(['']);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const userContext = useUserContext();
  
  const _setUser = (e) => {
    e.preventDefault();
    setUser({...user, [e.target.name]:e.target.value});
  }

  useEffect(()=>{
    getUser();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const getUser = async() => {
    setLoading(true);
    await axiosClient.get('/profiles')
    .then(res =>{
      if(res && res.status == 200){
        setLoading(false);
        let { data } = res.data;
        if(!data.profiles){
          setUser({...user, ...{name:data.name, email: data.email}})
        }else{
          setUser({...user, ...{name:data.name, email: data.email, phone: data.profiles.phone, pin_code: data.profiles.pin_code, address: data.profiles.address, image: data.profiles.avatar}});
        }
        userContext._setUser(data);
      }
    })
    .catch(error => {
      setLoading(false);
      console.log(error);
    })
  }

  const updateProfile = async(e) => {
      e.preventDefault();
      setUpdating(true);
      let userForm = new FormData();
      userForm.append('name', user.name);
      userForm.append('email', user.email);
      userForm.append('phone', user.phone);
      userForm.append('pin_code', user.pin_code);
      userForm.append('address', user.address);
      userForm.append('avatar', user.image);

      await axiosClient.post('/profiles/update', userForm)
      .then(res => {
        setUpdating(false); 
        if(res.status == 202){
            setErrors("");
            let { data, message } = res.data;
            if(!data.profiles){
              setUser({...user, ...{name:data.name, email: data.email}})
            }else{
              setUser({...user, ...{name:data.name, email: data.email, phone: data.profiles.phone, pin_code: data.profiles.pin_code, address: data.profiles.address, image: data.profiles.avatar}});
            }
            userContext._setUser(data);
            toast.fire({
              icon: 'success',
              title: message,
            })

        } 
      })
      .catch(({response}) => { 
          setUpdating(false);
          if(response){
              if(response.status == 422){
                  setErrors(response.data.errors);
              }else if(response.status == 401){
                  setErrors("");
                  toast.fire({
                      icon: 'error',
                      title: 'Please login!!!',
                  })
              }
          }
      })
  }

  return (
    <div className="container">
      <div className="my_portfolio_section_wrapper">
        {
          loading ?
            <PageLoading/>
          :
          <div className="card shadow my_portfolio_section mx-auto" style={{maxWidth:"800px"}}>

            <div className="card-header d-flex justify-content-between">
                <h4 className="title">Your Profile</h4> 
                <div></div>
            </div>
            <div className="card-body px-5 pt-5">  
              <form autoComplete='off' onSubmit={(e) => updateProfile(e)}>
                <div className="row g-5 mb-3">
                  <div className="col-md-6">
                      <label className="form-label">User Name</label>
                      <input type="text" className="form-control" name="name" value={user.name} onChange={(e) => _setUser(e)}/>
                      <div className="errors">
                        {
                          errors.hasOwnProperty('name') && errors['name'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-6">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" name="email" value={user.email} onChange={(e) => _setUser(e)}/>
                      <div className="errors">
                        {
                          errors.hasOwnProperty('email') && errors['email'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-6">
                      <label className="form-label">Phone Number</label>
                      <input type="text" className="form-control" name="phone" value={user.phone} onChange={(e) => _setUser(e)}/>
                      <div className="errors">
                        {
                          errors.hasOwnProperty('phone') && errors['phone'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-6">
                      <label className="form-label">Pin/Zip code</label>
                      <input type="text" className="form-control" name="pin_code" value={user.pin_code} onChange={(e) => _setUser(e)}/>
                      <div className="errors">
                        {
                          errors.hasOwnProperty('pin_code') && errors['pin_code'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-6">
                      <label className="form-label">Address</label>
                      <textarea className="form-control" name="address" value={user.address} onChange={(e) => _setUser(e)}/>
                      <div className="errors">
                        {
                          errors.hasOwnProperty('address') && errors['address'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-6">
                      <label className="form-label">Avatar</label>
                      <Image image={user} setImage={setUser} files="avatars" />
                  </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-primary float-end">
                        {
                          updating ?
                          (
                              <div className="spinner-border text-success" role="status">
                                  <span className="visually-hidden">Updating...</span>
                              </div>
                          )
                          :
                          <>Update Profile</>    
                        }
                    </button>
                </div>
              </form>
            </div>
          </div>
        }
      </div> 
    </div>
  )
}

export default ProfilePage