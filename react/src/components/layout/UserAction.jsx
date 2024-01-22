import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../Avatar';
import { useUserContext } from '../../context/front-end/UserContext';

const UserAction = ({ userDropdown, _setUserDropdown , pageLink, pageName }) => {

    const userContext = useUserContext();
    const { pathname } = useLocation();

  return (
    <>
        {
            !userContext.token?
            <li className="nav-item my_portfolio_dropdown user">
                <Link className='nav-link' to="/login"><span><i className="bi bi-box-arrow-in-right fs-5"></i></span> Login</Link>
            </li>
            :
            <li className="nav-item my_portfolio_dropdown user" onClick={() => _setUserDropdown()}>
                <a className="nav-link dropdown-toggle" role="button">    
                {
                    userContext.user.avatar ?
                    <Avatar name={userContext.user.name} avatar={userContext.user.avatar} files="avatars"/>
                    :
                    <><i className="bi bi-person-circle fs-5"></i> {userContext.user.name}</>
                }
                </a>
                <ul className={`my_portfolio_dropdown_menu ${userDropdown ? "drop-down":""}`}>
                    {
                        userContext.user.role == 'Admin' || userContext.user.role == 'Visitor' ?
                        <li className="dropdown-item"><Link to={ pageLink }><i className="bi bi-person-check-fill fs-5 me-2"></i><span>{ pageName }</span></Link></li>
                        :
                        ""
                    }
                    {
                        pathname.indexOf("/admin") == -1 && <li className="dropdown-item"><Link to="/profile"><i className="bi bi-person-lines-fill fs-5 me-2"></i><span>Profile</span></Link></li>
                    }         
                    <div className="my_portfolio_dropdown_divider"></div>
                    <li className="dropdown-item">
                        <Link  onClick={userContext.Logout}><i className="bi bi-box-arrow-left fs-5 me-2"></i><span>Logout</span></Link>
                    </li>
                </ul>  
            </li>
        }
    </>
  )
}

export default UserAction