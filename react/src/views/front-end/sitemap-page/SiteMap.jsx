import React, {  useEffect } from 'react'
import { usePageLoadingContext } from '../../../context/PageLoadingContext';

const SiteMap = () => {

  const { contact }  = usePageLoadingContext(); 

  useEffect(() =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    
  }, []);

  return (
    <div className="site-map-page">
      <div className="container">
        <div className="my_portfolio_section site-map"> 
          <div className="row">
            <div className="col-12 col-md-6">
                <div className={`contact-informarion-item address my_portfolio_line`}>
                    <div className="image-box-background">
                        <i className="bi bi-geo-alt"></i>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">My Portfolio</h5>
                        <p className="card-text">{contact.address && contact.address}</p>
                    </div>
                </div>
                <div className={`contact-informarion-item phone my_portfolio_line`}>
                    <div className="image-box-background">
                        <i className="bi bi-telephone-forward"></i>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Call Me</h5>
                        <p className="card-text">{contact.phoneNo1 && contact.phoneNo1}</p>
                    </div>
                  
                </div> 
                <div className={`contact-informarion-item email my_portfolio_line`}>
                    <div className="image-box-background">
                        <i className="bi bi-envelope-check"></i>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Email Me</h5>
                        <p className="card-text">{contact.emailNo1 && contact.emailNo1}</p>
                    </div>
                  
                </div> 
            </div>
            <div className="col-12 col-md-6">
              <iframe src="https://maps.google.com/maps?width=500&amp;height=500&amp;hl=en&amp;q=ho%20chi%20minh+(My%20Portfolio)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population Estimator map</a>
              </iframe>
            </div>
          </div>
        </div> 
      </div>
    </div>
  )
}

export default SiteMap
