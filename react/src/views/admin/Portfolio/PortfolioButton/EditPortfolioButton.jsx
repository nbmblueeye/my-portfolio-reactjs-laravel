import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { usePortfolioButtonContext } from '../../../../context/admin/Portfolio/PortfolioButtonContext';

const EditPortfolioButton = () => {

  const { portfolio_button_id } = useParams();

  const { loading, portfolios, getPortfolioButton, updatePortfolioButton, updating, updatePortfolioButtonErrors } = usePortfolioButtonContext();

  const [portfolioButton, setPortfolioButton]   = useState({
    portfolio_id:"",
    text:"",
    link:"",
  });

  const _setPortfolioButton = (e) => {
    setPortfolioButton({...portfolioButton, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let portfolioButton_ = getPortfolioButton(portfolio_button_id);
      if( portfolioButton_ ){
        setPortfolioButton({...portfolioButton,...{
            portfolio_id: portfolioButton_.portfolio_id,
            text: portfolioButton_.text,
            link: portfolioButton_.link,
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
            <label className="form-label" htmlFor="text">Button Text</label>
            <input type="text" className="form-control" id="text" name="text" value={portfolioButton.text} onChange={(e) => _setPortfolioButton(e)}/>
            <div className="errors">
              {
                updatePortfolioButtonErrors.hasOwnProperty('text') && updatePortfolioButtonErrors['text'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
              }
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label" htmlFor="link">Button Link</label>
            <input type="text" className="form-control" id="link" name="link" value={portfolioButton.link} onChange={(e) => _setPortfolioButton(e)}/>
            <div className="errors">
              {
                updatePortfolioButtonErrors.hasOwnProperty('link') && updatePortfolioButtonErrors['link'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
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
                updatePortfolioButtonErrors.hasOwnProperty('aportfolio_id') && updatePortfolioButtonErrors['portfolio_id'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
              }
            </div>
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
                <>Update Portfolio Button</>    
              }
            </button>
        </div>
      </>
    ) 
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Edit Portfolio Button</h5> 
        <Link to="/admin/portfolio/button/index">
          <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => updatePortfolioButton(e, portfolio_button_id, portfolioButton)}>
          { output }
        </form>
      </div>
    </> 
  )
}

export default EditPortfolioButton