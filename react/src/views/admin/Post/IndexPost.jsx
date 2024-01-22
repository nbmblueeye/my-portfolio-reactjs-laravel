import React from 'react'
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import DisplayImage from '../../../components/admin/DisplayImage';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import MyExcerpt from '../../../components/MyExcerpt';
import { usePostContext } from '../../../context/admin/Post/PostContext';
import { useUserContext } from '../../../context/front-end/UserContext';

const IndexPost = () => {

    const userContext = useUserContext();
    const { posts, loading, deletePost, deleting,  } = usePostContext();

    let output = "";
    if(loading){
        output = <Loading/>            
    }else{
        output = posts.length > 0 ?
        <table className="table table-bordered text-center align-middle">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">title</th>
                    <th scope="col">description</th>
                    <th scope="col">Thumbnail</th>
                    <th scope="col">Created_at</th>
                    {
                        userContext.user.role == "Admin" &&<th scope="col">Action</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    posts.map((post, index) => 
                        { 
                            return (        
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{post.title}</td>
                                <td>
                                    <MyExcerpt data={post.description} length={150}/>
                                </td>
                                <td className='text-center'><DisplayImage url={post.thumbnail} files="thumbnails"/></td>
                                <td>{post.created_at}</td>
                                {
                                    userContext.user.role == "Admin" &&
                                    <td>
                                        <div className="my-portfolio-table-button">
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-update">
                                                        <Popover.Body>
                                                        Update Post
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <Link className="button update" to={`/admin/post/edit/${post.id}`}><i className="bi bi-pencil"></i></Link>
                                            </OverlayTrigger>
                                            &nbsp;
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-delete">
                                                        <Popover.Body>
                                                        Delete Post
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <button className="button delete" type='button' disabled={deleting == post.id ? true:false} onClick={(e) => deletePost(e, post.id)}>
                                                {
                                                    deleting == post.id ?
                                                    (
                                                        <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
                                                    )
                                                    :
                                                    <i className="bi bi-trash3"></i>   
                                                }
                                                </button>                 
                                            </OverlayTrigger>
                                            
                                        </div>
                                    </td>
                                }
                            </tr>  
                            )
                        }
                    )
                }
            </tbody>
        </table>       
        : 
        <div className="d-flex align-items-center text-primary w-100 py-5">
            <strong>There are no Post available</strong>
        </div>
    }

  return (
    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Posts</h5> 
            {
                 userContext.user.role == "Admin" ?
                 <Link to="/admin/post/add">    
                    <button className='btn btn-primary float-end p-2'>Add New Post</button>
                </Link>
                :
                <div></div>
            }
        </div> 
        <div className="card-body">
            <div className="table-responsive">
                {
                    output
                }
            </div>
        </div>
    </>
  )
}

export default IndexPost