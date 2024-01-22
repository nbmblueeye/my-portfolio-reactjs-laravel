import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/Image';
import { usePortfolioContext } from '../../../context/admin/Portfolio/PortfolioContext';

const AddPortfolio = () => {

  const { addPortfolioErrors, addPortfolio, adding, refresh, setRefresh, } = usePortfolioContext();

  const [portfolio, setPortfolio]   = useState({
    title:"",
    sub_title:"",
    description:"",
    image:"",
  });

  const _setPortfolio = (e) => {
    setPortfolio({...portfolio, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(refresh){
      setTimeout(() => {
        setPortfolio({
          title:"",
          sub_title:"",
          description:"",
          image:"",
        })
      }, 2000)
    };
    return () => setRefresh(false);
  }, [refresh]);


  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Add New Portfolio</h5> 
        <Link to="/admin/portfolio/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => addPortfolio(e, portfolio)}>
            <div className="row g-3">
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={portfolio.title} onChange={(e) => _setPortfolio(e)}/>
                <div className="errors">
                  {
                    addPortfolioErrors.hasOwnProperty('title') && addPortfolioErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                  }
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="sub_title">Sub_Title</label>
                <input type="text" className="form-control" id="sub_title" name="sub_title" value={portfolio.sub_title} onChange={(e) => _setPortfolio(e)}/>
                <div className="errors">
                  {
                    addPortfolioErrors.hasOwnProperty('sub_title') && addPortfolioErrors['sub_title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                  }
                </div>
              </div>
              <div className="col-md-12 mb-3">
                    <label className="form-label" htmlFor="description">Description</label>
                    <textarea rows="3" className="form-control" id="description" name="description" value={portfolio.description} onChange={(e) => _setPortfolio(e)}/>
                    <div className="errors">
                      {
                        addPortfolioErrors.hasOwnProperty('description') && addPortfolioErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor='image'>Portfolio Image</label>
                    <Image image={portfolio} setImage={setPortfolio} files="portfolios"/>
                </div>
            </div>
            <div className="mt-5">
                <button type="submit" disabled={adding ? true:false} className="btn btn-primary float-end p-2">
                  {
                    adding ?
                    (
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Adding...</span>
                        </div>
                    )
                    :
                    <>Add New Portfolio</>    
                  }
                </button>
            </div>
        </form>
      </div>
    </> 
  )
}

export default AddPortfolio