import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../../../context/front-end/UserContext';
import Avatar from '../../Avatar';
import { useScrollToSectionContext } from '../../../context/front-end/ScrollToSectionContext';
import UserAction from '../UserAction';
import ThemeAction from '../ThemeAction';
import MyPorfolioHelmet from '../../../components/Helmet';

const Header = ( { settings } ) => {

  const userContext = useUserContext();
  const [slideDown, setSlideDown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [themeDropdown, setThemeModeDropdown] = useState(false);
  const [display, setDisplay] = useState(false);

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

  const _setDisplay = (e) => {
    e.preventDefault();
    if(!display){
      setDisplay(true);
      if(themeDropdown){
        setThemeModeDropdown(!themeDropdown);
      }
      if(userDropdown){
        setUserDropdown(!userDropdown);
      }
    }else{
      setDisplay(false);
    }
  };

  const { setScrollToSectionContext,  Nav_Items , navActive, setNavActive,} = useScrollToSectionContext();
  const headerRef = useRef();
  const accordionRef = useRef();
  const pageLocations = useLocation();
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener( 'scroll', () => {
      if(!headerRef.current){
        return false;
      }else{
        if(window.scrollY > headerRef.current.offsetTop){
          setSticky(true);
        }else{
          setSticky(false);
        } 
      }
    });
  }, [])
 
  const _setNavActive   = (index, e) => {
    e.preventDefault();
    setNavActive(index);
    setScrollToSectionContext(index);
  }

  const displayAccodionMenu = () => {
    setSlideDown(() => !slideDown);
  }

  return (
    <nav className={`${sticky ? "sticky":""}`} id="my_portfolio_header_front_end" ref={headerRef}>
      <MyPorfolioHelmet title={ Nav_Items[navActive] }/>
      <div className={`my-portfolio-nav-cover ${display ? "display":""}`}></div>
      <div className="container-lg">
      
        <Link className={`navbar-brand ${navActive == 100 ? "active":""}`} to="/" onClick={() => setNavActive(100)}>
          {
            settings.image ?
            <div className="navbar-brand-logo-box">
                <img src={`${import.meta.env.VITE_API_BASE_URL}/images/settings/${settings.image}`} alt="logo" />
            </div>
            :
            <h4>{ settings.websiteName ? settings.websiteName:"My Portfolio" }</h4>
          }
        </Link>
                
        <div className={`my-portfolio-nav-content ${display ? "display":""}`}>
          <div className="my-portfolio-nav-header">
              <Link className="navbar-brand" to="/">
                {
                  settings.image ?
                  <div className="navbar-brand-logo-box">
                      <img src={`${import.meta.env.VITE_API_BASE_URL}/images/settings/${settings.image}`} alt="logo" />
                  </div>
                  :
                  <h5>{ settings.websiteName ? settings.websiteName:"My Portfolio" }</h5>
                }
              </Link>
              <div className="navbar-close-button" onClick={(e) => _setDisplay(e)}>
                <i className="bi bi-x-lg"></i>
              </div>
          </div>
          <ul className="navbar-nav">
            {
              Nav_Items.map((Nav_Item, index) =>               
                
                <li className={`nav-item ${navActive == index ? "active":""} ${pageLocations.pathname != "/front-page" ? "disable-nav-item":""}`} key={index} onClick={(e) => _setNavActive(index, e)}>
                  {
                    Nav_Item.navLink ?
                    <Link className="nav-link" to={Nav_Item.navLink}>{ Nav_Item.name }</Link>
                    :
                    <a className={`nav-link`} >{ Nav_Item.name }</a>
                  }
                </li>                
              )
            }
            {
              !userContext.token ?
              <li className="nav-item my-portfolio-user-login-accordion">
                <Link className='nav-link' to="/login"><span><i className="bi bi-box-arrow-in-right fs-5"></i></span> Login</Link>
              </li>
              :
              <li className={`nav-item my-portfolio-user-accordion ${slideDown ? "slide-down":""}`} onClick={displayAccodionMenu}>
                <a className="nav-link" href="#">
                  {
                    userContext.user.avatar ?
                    <Avatar name={userContext.user.name} avatar={userContext.user.avatar} files="avatars"/>
                    :
                    <><i className="bi bi-person-circle fs-5"></i> {userContext.user.name}</>
                  }
                  <div className="chevron-down"><i className="bi bi-chevron-down"></i></div>
                </a>
                <ul className={`user-accordion-menu`} ref={accordionRef} style={{height: `${slideDown ? accordionRef.current.scrollHeight + "px":0 }`}}>
                  {
                    userContext.user.role == 'Admin' || userContext.user.role == 'Visitor'?
                    <li className="user-accordion-item"><Link  to="/admin"><i className="bi bi-person-check-fill fs-5 me-2"></i><span>Admin</span></Link></li>
                    :
                    <></>
                  }
                  <li className="user-accordion-item"><Link to="/profile"><i className="bi bi-person-lines-fill fs-5 me-2"></i><span>Profile</span></Link></li>
                  <li className="user-accordion-item">
                    <Link  onClick={userContext.Logout}><i className="bi bi-box-arrow-left fs-5 me-2"></i><span>Logout</span></Link>
                  </li>
                </ul> 
                 
              </li>
            }
          </ul>
        </div>
        <div className="my-portfolio-nav-right">
          <UserAction userDropdown={userDropdown} _setUserDropdown={_setUserDropdown} pageLink="/admin" pageName="Admin Page"/>
          <ThemeAction themeDropdown={themeDropdown} _setThemeModeDropdown={_setThemeModeDropdown} />
          <div className="my-portfolio-toggler-button nav-item" onClick={(e) => _setDisplay(e)}>         
             <span className="nav-link"><i className="bi bi-list"></i></span>
          </div> 
        </div> 
      </div>
    </nav>
  )
}

export default Header