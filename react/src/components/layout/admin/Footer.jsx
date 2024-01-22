import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ( {settings} ) => {

  return (
    <div className='my_portfolio_section footer mt-5 mt-md-0'>
        <div className="container">
            <footer> 
                <div className="row g-3">
                    <div className="col-md-4 d-flex justify-content-center justify-content-md-start align-items-center">
                        <Link className={`navbar-brand`} to="/admin/dashboard">
                            <h4>{settings.websiteName ? settings.websiteName:"My Portfolio"}</h4>
                        </Link>
                    </div>
                    <div className="col-md-8">
                        <p className='my-portfolio-copyright text-center py-3'>&copyright; 2023 nbmblueeye@gmail.com, Inc. All rights reserved.</p>
                    </div>
                </div> 
            </footer>
        </div>
    </div>
  )
}

export default Footer
