import React, {useMemo} from 'react';

const Image = ({image, setImage, files}) => {

  const _setImage = (e) =>{
     e.preventDefault();
     let file = e.target.files[0];
     let filesize = 1024 * 1024 * 2;
     let fileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if(file){
        if(fileTypes.includes(file.type)){
            if(file.size < filesize){
                let reader = new FileReader();
                reader.onloadend = (file) => {
                    if(reader.result.indexOf(';base64') != -1){
                        setImage({...image, image:reader.result});
                    }  
                }
                reader.readAsDataURL(file);
            }else{
                toast.fire({
                    icon: 'warning',
                    title: `File is oversized` ,
                })
            }
        }else{
            toast.fire({
                icon: 'warning',
                title: `Only allow image type: png, jpeg, jpg` ,
            })
        }
    }
  }

    let image_url = useMemo(() => {
        let photo = "";
        if(image.image){
            if(image.image.indexOf(';base64') != -1){
                photo = image?.image;
            }else{
                if(files){
                    photo = `${import.meta.env.VITE_API_BASE_URL}/images/${files}/${image?.image}`;
                }
            }
        }else{
            if(files == "parallaxs" || files == "myblocks" || files == "settings"){
                photo = `${import.meta.env.VITE_API_BASE_URL}/images/no-image-2-1.png`;
            }else{
                photo = `${import.meta.env.VITE_API_BASE_URL}/images/no-image.png`;
            }
        }
        return photo;
    },[image.image]);
  
  return (
    <>
        <div className="portfolio_image_button" style={{width:`${files == "parallaxs" || files == "myblocks" || files == "settings" ? "200px":"100px"}`, height:`100px`}}>
            <label className="form-label" htmlFor='image'>
                <img src={image_url} alt="portfolio_img" />
            </label>
            <input type="file" id='image' name='image' onChange={(e) => _setImage(e)}/>
        </div>
    </>
  )
}

export default Image