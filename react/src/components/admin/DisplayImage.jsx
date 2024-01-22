import React from 'react';

const DisplayImage = ( {url, files }) => {

    const displayImage = () => { 
        let photo = "";
        if(url){
            if(url.indexOf(';base64') != -1){
                photo = avatar;
            }else{
                photo = `${import.meta.env.VITE_API_BASE_URL}/images/${files}/${url}`;
            }
        }else{
            photo = `${import.meta.env.VITE_API_BASE_URL}/images/no-image.png`;
        }
        return photo;
    }
    
  return (
    <div className='my-portfolio-admin-image mx-auto' style={{width:`${files == "portfolios" ? "100px":"100px"}`, height:`${files == "portfolios" ? "100px":"100px"}`}}>
        <img src={displayImage()} alt="admin_img" className='img-fluid' style={{width:"100%", height: "100%"}}/>
    </div>
  )
}

export default DisplayImage