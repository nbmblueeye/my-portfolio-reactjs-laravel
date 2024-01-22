import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Image from '../../../components/Image';
import axiosClient from '../../../axiosClient';
import Loading from '../../../components/Loading';
import { useCustomerCommentContext } from '../../../context/admin/CustomerComment/CustomerCommentContext';

const EditCustomerComment = () => {

  const { customer_comment_id } = useParams();

  const { loading, getCustomerComment, updateCustomerComment, updating, updateCustomerCommentErrors } = useCustomerCommentContext();
  const [customerComment, setCustomerComment]   = useState({
      name:"",
      job:"",
      comment:"",
      image: "",
  });

  const _setCustomerComment = (e) => {
    setCustomerComment({...customerComment, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let customerComment_ = getCustomerComment(customer_comment_id);
      if( customerComment_ ){
        setCustomerComment({...customerComment,...{
            name: customerComment_.name,
            job: customerComment_.job,
            comment: customerComment_.comment,
            image:  customerComment_.image,
          }
        });
      }
    }
  }, [loading]);

  let output = "";
  if(loading){
    output = <Loading/>
  }else{ 
    output = (
      <>
        <div className="row g-3">
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="name">Customer Name</label>
            <input type="text" className="form-control" id="name" name="name" value={customerComment.name} onChange={(e) => _setCustomerComment(e)}/>
            <div className="errors">
              {
                updateCustomerCommentErrors.hasOwnProperty('name') && updateCustomerCommentErrors['name'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
              }
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="job">Customer Job</label>
            <input type="text" className="form-control" id="job" name="job" value={customerComment.job} onChange={(e) => _setCustomerComment(e)}/>
            <div className="errors">
              {
                updateCustomerCommentErrors.hasOwnProperty('job') && updateCustomerCommentErrors['job'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
              }
            </div>
          </div>
          <div className="col-md-12 mb-3">
              <label className="form-label" htmlFor="comment">Customer Comment</label>
              <textarea rows="3" className="form-control" id="comment" name="comment" value={customerComment.comment} onChange={(e) => _setCustomerComment(e)}/>
              <div className="errors">
                {
                  updateCustomerCommentErrors.hasOwnProperty('comment') && updateCustomerCommentErrors['comment'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                }
              </div>
          </div>
          <div className="col-md-4 mb-3">
              <label className="form-label" htmlFor='image'>Customer Image</label>
              <Image image={customerComment} setImage={setCustomerComment} files="customers"/>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" disabled={updating ? true:false} className="btn btn-primary float-end">
            {
              updating ?
              (
                <div className="spinner-border text-success" role="status">
                  <span className="visually-hidden">Updating...</span>
                </div>
              )
              :
              <>Update Customer Comment</>    
            }
          </button>
        </div>
      </>
    ) 
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Edit Customer Comment</h5> 
        <Link to="/admin/customer/comment/index">
          <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => updateCustomerComment( e, customer_comment_id , customerComment )}>
            { output }
        </form>
      </div>
    </> 
  )
}

export default EditCustomerComment