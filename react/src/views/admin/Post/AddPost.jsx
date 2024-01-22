import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/Image';
import MyCKEditor from '../../../components/MyCkEditor';
import { usePostContext } from '../../../context/admin/Post/PostContext';


const AddPost = () => {

    const { addPostErrors , addPost, adding, refresh, setRefresh, } = usePostContext();

    const [post, setPost]   = useState({
        title:'',
        image: '',
    });
    const [ description, setDescription ] = useState(null)
    const _setPost = (e) => {
        setPost({...post, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        if(refresh){
            setTimeout(() => {
                setPost({
                    title:'',
                    image: '',
                });
                setDescription("");
            }, 2000)
        };
        return () => setRefresh(false);
    }, [])

  return (
    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Add New Post</h5> 
            <Link to="/admin/post/index">
                <button className='btn btn-primary float-end p-2'>Back</button>
            </Link>
        </div>
        <div className="card-body ">
            <form autoComplete='off' onSubmit={(e) => addPost(e, post, description)}>
                <div className="row gap-3">
                    <div className="col-md-12 mb-3">
                        <label className="form-label" htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={post.title} onChange={(e) => _setPost(e)}/>
                        <div className="errors">
                            {
                                addPostErrors.hasOwnProperty('title') &&  addPostErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                            }
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label className="form-label" htmlFor='image'>Post Thumbnail</label>
                        <Image image={post} setImage={setPost} files="abouts"/> 
                    </div>
                    
                    <div className="col-md-12">
                        <label className="form-label" htmlFor="product_description">Description</label>                   
                        <MyCKEditor description={description} setDescription={setDescription} mode="addData"/>
                        <div className="errors">
                        {
                            addPostErrors.hasOwnProperty('description') && addPostErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                        </div>
                    </div>
                </div>
                <div className="mt-3">
                    <button type="submit" disabled={adding ? true:false} className="btn btn-primary float-end">
                        {
                            adding ?
                            (
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Adding...</span>
                                </div>
                            )
                            :
                            <>Add Post</>    
                        }
                    </button>
                </div>
            </form>
        </div>
    </> 
  )
}

export default AddPost