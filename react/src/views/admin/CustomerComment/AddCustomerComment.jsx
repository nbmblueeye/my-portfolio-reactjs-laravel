import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/Image';
import { useCustomerCommentContext } from '../../../context/admin/CustomerComment/CustomerCommentContext';

const AddCustomerComment = () => {

  const { addCustomerCommentErrors, addCustomerComment, adding, refresh } = useCustomerCommentContext();

  const [customerComment, setCustomerComment]   = useState({
    name:"",
    job:"",
    comment:"",
    image: "",
  });

  const _setCustomerComment = (e) => {
    setCustomerComment({...customerComment, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(refresh){
      setTimeout(() => {
        setCustomerComment({
          name:"",
          job:"",
          comment:"",
          image: "",
        })
      }, 2000)
    }
  }, [refresh])

  return (
      <>
        <div className="card-header d-flex justify-content-between">
          <h5 className="title">Add New Customer Comment</h5> 
          <Link to="/admin/customer/comment/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
          </Link>
        </div>
        <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => addCustomerComment(e, customerComment)}>
              <div className="row g-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="name">Customer Name</label>
                  <input type="text" className="form-control" id="name" name="name" value={customerComment.name} onChange={(e) => _setCustomerComment(e)}/>
                  <div className="errors">
                    {
                      addCustomerCommentErrors.hasOwnProperty('name') && addCustomerCommentErrors['name'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="job">Customer Job</label>
                  <input type="text" className="form-control" id="job" name="job" value={customerComment.job} onChange={(e) => _setCustomerComment(e)}/>
                  <div className="errors">
                    {
                      addCustomerCommentErrors.hasOwnProperty('job') && addCustomerCommentErrors['job'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                      <label className="form-label" htmlFor="comment">Customer Comment</label>
                      <textarea rows="3" className="form-control" id="comment" name="comment" value={customerComment.comment} onChange={(e) => _setCustomerComment(e)}/>
                      <div className="errors">
                        {
                          addCustomerCommentErrors.hasOwnProperty('comment') && addCustomerCommentErrors['comment'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-4 mb-3">
                      <label className="form-label" htmlFor='image'>Customer Image</label>
                      <Image image={customerComment} setImage={setCustomerComment} files="customers"/>
                  </div>
              </div>
              <div className="mt-5">
                  <button type="submit" disabled={adding ? true:false} className="btn btn-primary float-end">
                    {
                      adding ?
                      (
                        <div className="spinner-border text-success" role="status">
                          <span className="visually-hidden">Adding...</span>
                        </div>
                      )
                      :
                      <>Add New Customer Comment</>    
                    }
                  </button>
              </div>
          </form>
        </div>
      </> 
  )
}

export default AddCustomerComment