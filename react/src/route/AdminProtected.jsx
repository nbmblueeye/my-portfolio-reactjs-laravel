import React, {useEffect, useRef, useState} from 'react';
import axiosClient from '../axiosClient';
import { Outlet, useNavigate } from 'react-router-dom';
import PageLoading from '../components/PageLoading';

const AdminProtected = () => {

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const adminRef = useRef(true);
  
  useEffect(() => {
    const adminProtect = async() => {
      if(adminRef.current){
        setLoading(true);
        await axiosClient.get('/admin')
        .then((res) => {
            setLoading(false);
            setIsAdmin(true);
        })
        .catch((error) => {
            setLoading(false);
            setIsAdmin(false);
          if(error.response){
            if(error.response.status == 403){
              navigate('/');
              toast.fire({
                icon: 'error',
                title: error.response.data.error,
              })
            }else if(error.response.status == 401){
                navigate('/');
                toast.fire({
                  icon: 'error',
                  title: error.response.data.message,
                })
            }else{
              console.log(error.response);
            }
          }
        });
      }
   }

   adminProtect();

    return () => {
      if(isAdmin){
        setIsAdmin(false);
      }
      adminRef.current = false;
    }
  
  }, []);

  let output = "";
  if(loading){
    output = (
              <PageLoading/>
            )
  }else{
    output =  isAdmin ? <Outlet/>:""
  }

  return (
    <>
       { output }
    </>
  )

}

export default AdminProtected
