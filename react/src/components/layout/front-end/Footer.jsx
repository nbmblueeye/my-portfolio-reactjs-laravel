import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScrollToSectionContext } from '../../../context/front-end/ScrollToSectionContext';

const Footer = ( { settings } ) => {

  const pageLocations = useLocation();
  const { setScrollToSectionContext,  navActive, setNavActive, } = useScrollToSectionContext();

  const _setNavActive   = (index, e) => {
    e.preventDefault();
    setNavActive(index);
    setScrollToSectionContext(index);
  }

  const Nav_Items = [
    { name: 'Portfolio', navLink:"#"},
    { name: 'Services', navLink:"#"},
    { name: 'Home', navLink:"#"},
    { name: 'About', navLink:"#"},
    { name: 'Skills', navLink:"#"},
    { name: 'Journey', navLink:"#"},
    { name: 'Contact', navLink:"#"},
    { name: 'Customer', navLink:"#"},
  ];

  return (
    <div className='my_portfolio_section footer'>
        <div className="my-portfolio-footer-divider"></div>
        <div className="container">
          <footer className="my_portfolio_footer_front_end">
              <div className="row g-3">
                <div className="col-md-4 px-3 px-md-5 mb-3">
                  <div className="my_portfolio_line">
                    <Link className={`navbar-brand ${navActive == 100 ? "active":""}`} to="/" onClick={() => setNavActive(100)}>
                        <h4>{settings.websiteName ? settings.websiteName:"My Portfolio"}</h4>
                    </Link>
                  </div>
                  <p className=''>
                      {settings.websiteDescription}
                  </p>
                </div>
                <div className="col-md-8 px-3">
                  <div className="row g-3">
                      <div className="col-sm-4 mb-3"> 
                        <div className="my_portfolio_line">
                          <h5>Quick Links</h5>
                        </div>
                        <ul className="nav flex-column">
                        {
                          Nav_Items.map((Nav_Item, index) => 
                            <li className={`nav-item ${navActive == index ? "active":""} ${pageLocations.pathname != "/front-page" ? "disable-nav-item":""}`} key={index} onClick={(e) => _setNavActive(index, e)}> 
                              <Link className={`nav-link`} to={Nav_Item.navLink}>{ Nav_Item.name }</Link>   
                            </li>  
                          )
                        }
                        </ul>
                      </div>

                      <div className="col-sm-3 mb-3"> 
                        <div className="my_portfolio_line">
                          <h5>More...</h5>
                        </div>
                        <ul className="nav flex-column">
                            <li className={`nav-item mb-2 ${navActive == 8 ? "active":""} ${pageLocations.pathname != "/front-page" ? "disable-nav-item":""}`} onClick={() => setNavActive(8)}><Link to="/my-blogs" className="nav-link">My Blogs</Link></li>
                            <li className="nav-item mb-2"><Link to="/sitemaps" className="nav-link">Sitemaps</Link></li>
                        </ul>
                      </div>
                      
                      <div className="col-sm-5 mb-3">  
                        <div className="my_portfolio_line">
                          <h5>Reach Us</h5>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item"><p className=''><span className='fs-5 me-1'><i className="bi bi-geo-alt"></i></span><span>Address:</span> {settings.address}</p></li>
                            <li className="nav-item"><p className=''><span className='fs-5 me-1'><i className="bi bi-telephone"></i></span><span>Phone No.1:</span> {settings.phoneNo1}</p></li>
                            <li className="nav-item"><p className=''><span className='fs-5 me-1'><i className="bi bi-telephone"></i></span><span>Phone No.2:</span> {settings.phoneNo2}</p></li>
                            <li className="nav-item"><p className=''><span className='fs-5 me-1'><i className="bi bi-envelope"></i></span><span>Email No.1:</span> {settings.emailNo1}</p></li>
                            <li className="nav-item"><p className=''><span className='fs-5 me-1'><i className="bi bi-envelope"></i></span><span>Email No.2:</span> {settings.emailNo2}</p></li>
                        </ul>
                      </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row align-items-md-center py-4 my-4 border-top">     
                  <p className='my-portfolio-copyright order-2 order-md-1'>&copyright; 2023 nbmblueeye@gmail.com, Inc. All rights reserved.</p>
                  <div className={`ms-md-auto my-portfolio-social-media-box order-1 order-md-2`}>          
                    <div className="social-media">
                        <div className='icon facebook'>
                            <Link to={`${settings.facebook ? settings.facebook:"#"}`} target='_blank' rel='noreferrer'>
                              <i className="bi bi-facebook"></i>
                            </Link>
                        </div>
                        <div className='icon instagram'>
                            <Link to={`${settings.instagram ? settings.instagram:"#"}`} target='_blank' rel='noreferrer'>
                              <i className="bi bi-instagram"></i>
                            </Link>
                        </div>
                        <div className='icon linkedin'>
                            <Link to={`${settings.linkedin ? settings.linkedin:"#"}`} target='_blank' rel='noreferrer'>
                              <i className="bi bi-linkedin"></i>
                            </Link>
                        </div>
                        <div className='icon youtube'>
                            <Link to={`${settings.youtube ? settings.youtube:"#"}`} target='_blank' rel='noreferrer'>
                                <i className="bi bi-youtube"></i>
                            </Link>
                        </div>
                    </div>
                  </div>  
              </div>
          </footer>
        </div>
    </div>
  )
}

export default Footer