import React from 'react';

const Avatar = ({name, avatar, files}) => {

    const displayImage = () => { 
        let photo = "";
        if(avatar){
            if(avatar.indexOf(';base64') != -1){
                photo = avatar;
            }else{
                photo = `${import.meta.env.VITE_API_BASE_URL}/images/${files}/${avatar}`;
            }
        }else{
            photo = `${import.meta.env.VITE_API_BASE_URL}/images/no-image.png`;
        }
        return photo;
    }
    
  return (
    <div className='my-portfolio-avatar'>
        <img src={displayImage()} alt="avatar" /><span>{name}</span>
    </div>
  )
}

export default Avatar