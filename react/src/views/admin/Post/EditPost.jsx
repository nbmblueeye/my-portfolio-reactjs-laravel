import React, { useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import Image from '../../../components/Image';
import Loading from '../../../components/Loading';
import MyCKEditor from '../../../components/MyCkEditor';
import { usePostContext } from '../../../context/admin/Post/PostContext';

const EditPost = () => {

    let { post_id } = useParams();

    const { loading, getPost, updatePost, updating, updatePostErrors } = usePostContext();
    const [post, setPost] = useState({
        title:'',
        image:'',
    });
    const [description, setDescription] = useState(null);
    const _setPost = (e) => {
        setPost({...post, [e.target.name]: e.target.value});
    }

    useEffect(() =>{
        if(!loading){
          let post_ = getPost(post_id);   
          if( post_ ){
            setPost({...post , ...{title: post_.title , image:post_.thumbnail ? post_.thumbnail:""}});
            setDescription(post_.description);
          }
        }
    }, [loading]);

     let output = "";
     if(loading){
       output = <Loading/>
     }else{ 
       output = (
         <>
            <div className="row gap-3">
                <div className="col-md-12 mb-3">
                    <label className="form-label" htmlFor='title'>Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={post.title} onChange={(e) => _setPost(e)}/>
                    <div className="errors">
                        {
                            updatePostErrors.hasOwnProperty('title') && updatePostErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                    </div>
                </div>
                <div className="col-md-12 mb-3">
                    <label className="form-label" htmlFor='image'>Post Thumbnail</label>
                    <Image image={post} setImage={setPost} files="thumbnails"/> 
                </div>
                <div className="col-md-12">
                    <label className="form-label" htmlFor="product_description">Description</label>
                    {
                        description && <MyCKEditor description={description} setDescription={setDescription} mode="updateData"/>
                    }
                   
                    <div className="errors">
                    {
                        updatePostErrors.hasOwnProperty('description') && updatePostErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <button type="submit" disabled={updating ? true:false} className="btn btn-primary float-end">
                    {
                        updating ?
                        (
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Updating...</span>
                            </div>
                        )
                        :
                        <>Update Post</>    
                    }
                </button>
            </div>
         </>
       ) 
     }

  return (
    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Update Post</h5> 
            <Link to="/admin/post/index">
                <button className='btn btn-primary float-end p-2'>Back</button>
            </Link>
        </div>
        <div className="card-body ">
            <form autoComplete='off' onSubmit={(e) => updatePost( e, post_id, post, description)}>
               {
                output
               }
            </form>
        </div>
    </> 
  )
}

export default EditPost