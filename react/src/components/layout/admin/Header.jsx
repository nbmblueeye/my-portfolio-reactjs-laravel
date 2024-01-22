import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import UserAction from '../UserAction';
import ThemeAction from '../ThemeAction';
import { useVisitorMessageContext } from '../../../context/front-end/VisitorMessageContext';

const Header = ( { showSideBar, setShowSideBar, settings } ) => {

  const { unreadNotification } = useVisitorMessageContext();

  const [userDropdown, setUserDropdown] = useState(false);
  const [themeDropdown, setThemeModeDropdown] = useState(false);

  const _setUserDropdown = () => {
    if(!userDropdown){
      setUserDropdown(true);
      if(themeDropdown){
        setThemeModeDropdown(!themeDropdown);
      }
    }else{
      setUserDropdown(false);
    }
  }

  const _setThemeModeDropdown = () => {
    if(!themeDropdown){
      setThemeModeDropdown(true);
      if(userDropdown){
        setUserDropdown(!userDropdown);
      }
    }else{
      setThemeModeDropdown(false);
    }
  }

  return (
    <nav className="navbar my_portfolio_admin_navbar" id='my_portfolio_header'>
      <div className="container">
        <div className="navbar_box">
          <div className="navbar-column left">
            <li className="nav-item">
              <Link className="navbar-brand">
                {
                  settings.image ?
                  <div className="navbar-brand-logo-box">
                      <img src={`${import.meta.env.VITE_API_BASE_URL}/images/settings/${settings.image}`} alt="logo" />
                  </div>
                  :
                  <h4>{ settings.websiteName ? settings.websiteName:"My Portfolio" }</h4>
                }
                
              </Link>
            </li> 
            <div className="sidebar-toggler" onClick={(e) => setShowSideBar(e)}>
              {
                showSideBar ?
                <span><i className="bi bi-layout-text-sidebar"></i></span>
                :
                <span><i className="bi bi-layout-text-sidebar-reverse"></i></span>
              }
                
            </div> 
          </div>
          <div className="navbar-column right">
               <div></div> 
              <div className="my-portfolio-nav-box">  
                    <OverlayTrigger trigger={['hover', 'focus']} placement="bottom" 
                                      overlay={
                                            <Popover id="popover-update">
                                              <Popover.Body>
                                              {unreadNotification.length ? unreadNotification.length:0} unread message
                                              </Popover.Body>
                                            </Popover>
                                      }>
                      <li className="nav-item my-portfolio-notification-box">
                        <a className='nav-link position-relative'>
                          <span><i className="bi bi-bell fs-5"></i></span>
                          <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                            {unreadNotification.length && unreadNotification.length}
                          </span>
                        </a>
                    </li>
                  </OverlayTrigger>
                  
                <UserAction userDropdown={userDropdown} _setUserDropdown={_setUserDropdown} pageLink="/front-page" pageName="To Front Page"/>
                <ThemeAction themeDropdown={themeDropdown} _setThemeModeDropdown={_setThemeModeDropdown} />
              </div>
            </div>
        </div>
      </div>
    </nav>

  )
}

export default Header
