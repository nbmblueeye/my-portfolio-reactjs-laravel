import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import DisplayImage from '../../../components/admin/DisplayImage';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Pagination from '../../../components/Pagination';
import { useCustomerCommentContext } from '../../../context/admin/CustomerComment/CustomerCommentContext';
import { useUserContext } from '../../../context/front-end/UserContext';

const IndexCustomerComment = () => {

    const userContext = useUserContext();
    const { customerComments, comments, getCustomerComments , loading, deleteCustomerComment, deleting, } = useCustomerCommentContext();
   
    let output = "";
    if(loading){
        output = <Loading/>            
    }else{
        output = customerComments.length > 0 ?
        <table className="table table-bordered text-center align-middle">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Customer Job</th>
                    <th scope="col">comment</th>
                    <th scope="col">Image</th>
                    <th scope="col">Created_at</th>
                    {
                        userContext.user.role == "Admin" && <th scope="col">Action</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    customerComments.map((customerComment, index) => 
                        { 
                            return (        
                                <tr key={index}>
                                    <th scope="row">{customerComment.id}</th>
                                    <td>{customerComment.name}</td>
                                    <td>{customerComment.job}</td>
                                    <td>{customerComment.comment}</td>
                                    <td className='text-center'><DisplayImage url={customerComment.image} files="customers"/></td>
                                    <td>{customerComment.created_at}</td>
                                    {
                                     userContext.user.role == "Admin" &&   
                                        <td>
                                            <div className="my-portfolio-table-button">
                                                <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                    overlay={
                                                        <Popover id="popover-update">
                                                            <Popover.Body>
                                                                Update Customer Comment
                                                            </Popover.Body>
                                                        </Popover>
                                                    }>
                                                    <Link className="button update" to={`/admin/customer/comment/edit/${customerComment.id}`}><i className="bi bi-pencil"></i></Link>
                                                </OverlayTrigger>
                                                &nbsp;
                                                <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                    overlay={
                                                        <Popover id="popover-delete">
                                                            <Popover.Body>
                                                                Delete Customer Comment
                                                            </Popover.Body>
                                                        </Popover>
                                                    }>
                                                    <button className="button delete" type='button' disabled={deleting == customerComment.id ? true:false} onClick={(e) => deleteCustomerComment(e, customerComment.id)}>
                                                        {
                                                            deleting == customerComment.id ?
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
            <strong>There are no Customer Comment Information available</strong>
        </div>
    }  
    
  return (
   
    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Customer Comment</h5> 
            {
                userContext.user.role == "Admin" ?
                <Link to="/admin/customer/comment/add">
                    <button className='btn btn-primary float-end p-2'>Add Customer Comment Information</button>
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
            {
                comments.total > comments.per_page &&
                <div className="d-flex justify-content-end mt-5 me-5">
                    <Pagination items={comments}  onPaginate={getCustomerComments}/> 
                </div>
            }
        </div>
    </>
       
  )
}

export default IndexCustomerComment