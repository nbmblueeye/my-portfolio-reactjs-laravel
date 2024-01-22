import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolioButtonContext } from '../../../../context/admin/Portfolio/PortfolioButtonContext';

const AddPortfolioButton = () => {

  const { portfolios ,addPortfolioButtonErrors , addPortfolioButton, adding, refresh, setRefresh, } = usePortfolioButtonContext();

  const [portfolioButton, setPortfolioButton]   = useState({
    portfolio_id:"",
    text:"",
    link:"",
  });

  const _setPortfolioButton = (e) => {
    setPortfolioButton({...portfolioButton, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(refresh){
      setTimeout(() => {
        setPortfolioButton({
          portfolio_id:"",
          text:"",
          link:"",
        })
      }, 2000)
    };
    return () => setRefresh(false);
  }, [refresh])

 
  
  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Add New Portfolio Button</h5> 
        <Link to="/admin/portfolio/button/index">
          <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => addPortfolioButton(e, portfolioButton)}>
            <div className="row g-3">
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="text">Button Text</label>
                <input type="text" className="form-control" id="text" name="text" value={portfolioButton.text} onChange={(e) => _setPortfolioButton(e)}/>
                <div className="errors">
                  {
                    addPortfolioButtonErrors.hasOwnProperty('text') && addPortfolioButtonErrors['text'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                  }
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="link">Button Link</label>
                <input type="text" className="form-control" id="link" name="link" value={portfolioButton.link} onChange={(e) => _setPortfolioButton(e)}/>
                <div className="errors">
                  {
                    addPortfolioButtonErrors.hasOwnProperty('link') && addPortfolioButtonErrors['link'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                  }
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label" htmlFor="portfolio_id">Portfolio</label>
                <select className="form-select" id="portfolio_id" name="portfolio_id" value={portfolioButton.portfolio_id} onChange={(e) => _setPortfolioButton(e)}>
                  <option value=''>Choose a Portfolio...</option>
                  {
                    portfolios.length > 0 ?
                    portfolios.map((portfolio, index) => <option value={portfolio.id} key={index}>{portfolio.title}</option>)
                    :
                    <option>...</option>
                  }
                </select>
                <div className="errors">
                  {
                    addPortfolioButtonErrors.hasOwnProperty('portfolio_id') && addPortfolioButtonErrors['portfolio_id'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                  }
                </div>
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
                    <>Add New Portfolio Button</>    
                  }
                </button>
            </div>
        </form>
      </div>
    </> 
  )
}

export default AddPortfolioButton