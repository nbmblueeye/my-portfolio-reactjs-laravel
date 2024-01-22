import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Image from '../../../components/Image';
import Loading from '../../../components/Loading';
import { usePortfolioContext } from '../../../context/admin/Portfolio/PortfolioContext';


const EditPortfolio = () => {

  const { portfolio_id } = useParams();
  const { loading, getPortfolio, updatePortfolio, updating, updatePortfolioErrors } = usePortfolioContext();

  const [portfolio, setPortfolio]   = useState({
      title:"",
      sub_title:"",
      description:"",
      image:"",
  });

  const _setPortfolio = (e) => {
    setPortfolio({...portfolio, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let portfolio_ = getPortfolio(portfolio_id);
      if( portfolio_ ){
        setPortfolio({...portfolio,...{
          title: portfolio_.title,
          sub_title: portfolio_.sub_title,
          description: portfolio_.description,
          image: portfolio_.image
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
            <label className="form-label" htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" value={portfolio.title} onChange={(e) => _setPortfolio(e)}/>
            <div className="errors">
              {
                updatePortfolioErrors.hasOwnProperty('title') && updatePortfolioErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
              }
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="sub_title">Title</label>
            <input type="text" className="form-control" id="sub_title" name="sub_title" value={portfolio.sub_title} onChange={(e) => _setPortfolio(e)}/>
            <div className="errors">
              {
                updatePortfolioErrors.hasOwnProperty('sub_title') && updatePortfolioErrors['sub_title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
              }
            </div>
          </div>
          <div className="col-md-12 mb-3">
              <label className="form-label" htmlFor="description">Description</label>
              <textarea rows="3" className="form-control" id="description" name="description" value={portfolio.description} onChange={(e) => _setPortfolio(e)}/>
              <div className="errors">
                {
                  updatePortfolioErrors.hasOwnProperty('description') && updatePortfolioErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                }
              </div>
          </div>
          <div className="col-md-4 mb-3">
              <label className="form-label" htmlFor='image'>Portfolio Image</label>
              <Image image={portfolio} setImage={setPortfolio} files="portfolios"/>
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
                  <>Update Portfolio</>    
              }
          </button>
        </div>
      </>
    ) 
  
  }

  return (
    <div>
      <div className="card shadow my_portfolio_section mx-auto">
        <div className="card-header d-flex justify-content-between">
          <h5 className="title">Edit Portfolio</h5> 
          <Link to="/admin/portfolio/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
          </Link>
        </div>
        <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => updatePortfolio(e, portfolio_id, portfolio)}>
              { output }
          </form>
        </div>
      </div> 
    </div>
  )
}

export default EditPortfolio