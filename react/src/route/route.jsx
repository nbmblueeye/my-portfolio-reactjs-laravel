import { Navigate, createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/front-end/MainLayout';

import Login from '../views/auth/Login';
import Register from '../views/auth/Register';
import EmailVerification from '../views/auth/EmailVerification';
import ForgotPassword from '../views/auth/ForgotPassword';
import ResetPassword from '../views/auth/ResetPassword';

import AdminLayout from '../components/layout/admin/AdminLayout';
import AdminProtected from './AdminProtected';

import DashBoard from '../views/admin/DashBoard';

import Inbox from '../views/admin/email/Inbox';

import NotFound from '../views/NotFound';

import FrontPage from '../views/front-end/front-page/FrontPage';
import ProfilePage from '../views/front-end/profile-page/ProfilePage';

import Home from '../views/admin/Home/Home';
import IndexHome from '../views/admin/Home/IndexHome';
import AddHome from '../views/admin/Home/AddHome';
import EditHome from '../views/admin/Home/EditHome';

import About from '../views/admin/About/About';
import IndexAbout from '../views/admin/About/IndexAbout';
import AddAbout from '../views/admin/About/AddAbout';
import EditAbout from '../views/admin/About/EditAbout';

import AboutItem from '../views/admin/About/AboutItem/AboutItem';
import IndexAboutItem from '../views/admin/About/AboutItem/IndexAboutItem';
import AddAboutItem from '../views/admin/About/AboutItem/AddAboutItem';
import EditAboutItem from '../views/admin/About/AboutItem/EditAboutItem';

import Skill from '../views/admin/Skills/Skill';
import IndexSkill from '../views/admin/Skills/IndexSkill';
import AddSkill from '../views/admin/Skills/AddSkill';
import EditSkill from '../views/admin/Skills/EditSkill';

import SkillItem from '../views/admin/Skills/SkillItem/SkillItem';
import IndexSkillItem from '../views/admin/Skills/SkillItem/IndexSkillItem';
import AddSkillItem from '../views/admin/Skills/SkillItem/AddSkillItem';
import EditSkillItem from '../views/admin/Skills/SkillItem/EditSkillItem';

import Qualification from '../views/admin/Qualifications/Qualification';
import IndexQualification from '../views/admin/Qualifications/IndexQualification';
import AddQualification from '../views/admin/Qualifications/AddQualification';
import EditQualification from '../views/admin/Qualifications/EditQualification';

import QualificationItem from '../views/admin/Qualifications/Qualification-Items/QualificationItem';
import IndexQualificationItem from '../views/admin/Qualifications/Qualification-Items/IndexQualificationItem';
import AddQualificationItem from '../views/admin/Qualifications/Qualification-Items/AddQualificationItem';
import EditQualificationItem from '../views/admin/Qualifications/Qualification-Items/EditQualificationItem';

import QualificationDetail from '../views/admin/Qualifications/Qualification-Details/QualificationDetail';
import IndexQualificationDetail from '../views/admin/Qualifications/Qualification-Details/IndexQualificationDetail';
import AddQualificationDetail from '../views/admin/Qualifications/Qualification-Details/AddQualificationDetail';
import EditQualificationDetail from '../views/admin/Qualifications/Qualification-Details/EditQualificationDetail';


import Service from '../views/admin/Services/Service';
import IndexService from '../views/admin/Services/IndexServices';
import AddService from '../views/admin/Services/AddService';
import EditService from '../views/admin/Services/EditService';

import ServiceItem from '../views/admin/Services/Service-Items/ServiceItem';
import IndexServiceItem from '../views/admin/Services/Service-Items/IndexServiceItem';
import AddServiceItem from '../views/admin/Services/Service-Items/AddServiceItem';
import EditServiceItem from '../views/admin/Services/Service-Items/EditServiceItem';

import Portfolio from '../views/admin/Portfolio/Portfolio';
import IndexPortfolio from '../views/admin/Portfolio/IndexPortfolio';
import AddPortfolio from '../views/admin/Portfolio/AddPortfolio';
import EditPortfolio from '../views/admin/Portfolio/EditPortfolio';

import PortfolioButton from '../views/admin/Portfolio/PortfolioButton/PortfolioButton';
import IndexPortfolioButton from '../views/admin/Portfolio/PortfolioButton/IndexPortfolioButton';
import AddPortfolioButton from '../views/admin/Portfolio/PortfolioButton/AddPortfolioButton';
import EditPortfolioButton from '../views/admin/Portfolio/PortfolioButton/EditPortfolioButton';

import CustomerComment from '../views/admin/CustomerComment/CustomerComment';
import IndexCustomerComment from '../views/admin/CustomerComment/IndexCustomerComment';
import AddCustomerComment from '../views/admin/CustomerComment/AddCustomerComment';
import EditCustomerComment from '../views/admin/CustomerComment/EditCustomerComment';

import User from '../views/admin/Users/Users/User';
import IndexUser from '../views/admin/Users/Users/IndexUsers';
import AddUser from '../views/admin/Users/Users/AddUser';
import EditUser from '../views/admin/Users/Users/EditUser';

import Role from '../views/admin/Users/Roles/Role';
import IndexRole from '../views/admin/Users/Roles/IndexRole';
import EditRole from '../views/admin/Users/Roles/EditRole';
import AddRole from '../views/admin/Users/Roles/AddRole';

import Setting from '../views/admin/Setting/Setting';
import Parallax from '../views/admin/ParallaxSection/Parallax';

import MyBlock from '../views/admin/Post/MyBlock/MyBlock';
import MyBlogs from '../views/front-end/my-blogs-page/MyBlogs';

import Post from '../views/admin/Post/Post';
import IndexPost from '../views/admin/Post/IndexPost';
import AddPost from '../views/admin/Post/AddPost';
import EditPost from '../views/admin/Post/EditPost';
import MyPost from '../views/front-end/my-blogs-page/MyPost';
import IndexVisitorMessage from '../views/admin/Users/Visitor/IndexVisitorMessage';
import SiteMap from '../views/front-end/sitemap-page/SiteMap';


const router = createBrowserRouter([
    {
        path: '/',
        element:<MainLayout/>,
        children:[
            {
                path: "*",
                element:<NotFound/>
            },

            {
                path:"/",
                element: <Navigate to="/front-page"/>
            },

            {
                path:"/front-page",
                element: <FrontPage/>
            },

            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/email/verify/:user_id",
                element:<EmailVerification/>
            },

            {
                path:"/register",
                element:<Register/>
            },

            {
                path:"/forgot-password",
                element:<ForgotPassword/>
            },

            {
                path:"/reset-password/:token",
                element:<ResetPassword/>
            },

            {
                path:"/profile",
                element:<ProfilePage/>,
            },

            {
                path:"/my-blogs",
                element:<MyBlogs/>,
            },

            {
                path:"/my-blogs/:post_slug",
                element:<MyPost/>,
            },

            {
                path:"/sitemaps",
                element:<SiteMap/>
            },
            

        ]
    },

    {
        element:<AdminProtected/>,
        children:[
            {
                path:"/admin",
                element:<AdminLayout/>,
                children:[
                   
                    {
                        path:"/admin",
                        element: <Navigate to="/admin/dashboard"/>
                    },
                    
                    {
                        path: "/admin/dashboard",
                        element:<DashBoard/>
                    },

                    {
                        path: "/admin/setting",
                        element: <Setting/>
                    },

            //Post
                    {
                        path: "/admin/post",
                        element:<Post/>,
                        children:[
                            {
                                path: "/admin/post/index",
                                element:<IndexPost/>,
                            },
                            {
                                path: "/admin/post/add",
                                element:<AddPost/>,
                            },
                            {
                                path: "/admin/post/edit/:post_id",
                                element: <EditPost/>,
                            },
        
                        ]
                    },

                    {
                        path: "/admin/my-block",
                        element:<MyBlock/>
                    },

            //Home
                    {
                        path: "/admin/home",
                        element:<Home/>,
                        children:[
                            {
                                path: "/admin/home/index",
                                element:<IndexHome/>
                            },
                            {
                                path: "/admin/home/add",
                                element:<AddHome/>
                            },
                            {
                                path:"/admin/home/edit/:home_id",
                                element:<EditHome/>
                            },
                        ]
                    },
                   
            //EndHome

            //About
                    {
                        path:"/admin/about",
                        element:<About/>,
                        children:[
                            {
                                path:"/admin/about/index",
                                element: <IndexAbout/>,
                            },
                            {
                                path:"/admin/about/add",
                                element: <AddAbout/>
                            },
                            {
                                path:"/admin/about/edit/:about_id",
                                element:<EditAbout/>
                            },
                            {
                                path:"/admin/about/item",
                                element: <AboutItem/>,
                                children:[
                                    {
                                        path:"/admin/about/item/index",
                                        element:<IndexAboutItem/>
                                    },
                                    {
                                        path:"/admin/about/item/add",
                                        element:<AddAboutItem/>
                                    },
                                    {
                                        path:"/admin/about/item/edit/:aboutitem_id",
                                        element:<EditAboutItem/>
                                    },
                                ]
                            },
                            
                        ]
                    },
                        
            //EndAbout

            //Skill
                    {
                        path: "/admin/skills",
                        element:<Skill/>,
                        children:[
                            {
                                path:"/admin/skills/index",
                                element: <IndexSkill/>
                            },
                            {
                                path:"/admin/skills/add",
                                element:<AddSkill/>
                            },
                            {
                                path:"/admin/skills/edit/:skill_id",
                                element:<EditSkill/>
                            },
                            {
                                path:"/admin/skills/item",
                                element:<SkillItem/>,
                                children:[
                                    {
                                        path:"/admin/skills/item/index",
                                        element:<IndexSkillItem/>,
                                    },

                                    {
                                        path:"/admin/skills/item/add",
                                        element:<AddSkillItem/>,
                                    },

                                    {
                                        path:"/admin/skills/item/edit/:skillItem_id",
                                        element:<EditSkillItem/>
                                    },
                                ]
                            },
                        ]
                    },
                    
                              
            //End Skill

                  
            //Qualifications

                    {
                        path:"/admin/qualification",
                        element: <Qualification/>,
                        children:[
                            {
                                path:"/admin/qualification/index",
                                element: <IndexQualification/>
                            }
                            ,
                            {
                                path:"/admin/qualification/add",
                                element: <AddQualification/>,
                            },        
                            {
                                path:"/admin/qualification/edit/:qualification_id",
                                element: <EditQualification/>,
                            },
                            {
                                path:"/admin/qualification/item",
                                element: <QualificationItem/>,
                                children:[
                                    {
                                        path:"/admin/qualification/item/index",
                                        element: <IndexQualificationItem/>,
                                    },
                                    {
                                        path:"/admin/qualification/item/add",
                                        element: <AddQualificationItem/>,
                                    },
                
                                    {
                                        path:"/admin/qualification/item/edit/:qualification_item_id",
                                        element: <EditQualificationItem/>,
                                    },
                                ]
                            },
                            {
                                path:"/admin/qualification/detail",
                                element: <QualificationDetail/>,
                                children:[
                                    {
                                        path:"/admin/qualification/detail/index",
                                        element: <IndexQualificationDetail/>,
                                    },
                                    
                                    {
                                        path:"/admin/qualification/detail/add",
                                        element: <AddQualificationDetail/>,
                                    },
                
                                    {
                                        path:"/admin/qualification/detail/edit/:qualification_detail_id",
                                        element: <EditQualificationDetail/>,
                                    },
                                ]
                            },
                        ]
                    },

            //End Qualifications

            //Services
                    {
                        path:"/admin/service",
                        element: <Service/>,
                        children:[
                            {
                                path:"/admin/service/index",
                                element: <IndexService/>,
                            },
                            {
                                path:"/admin/service/add",
                                element: <AddService/>,
                            },
                            {
                                path:"/admin/service/edit/:service_id",
                                element: <EditService/>
                            },
                            {
                                path:"/admin/service/item",
                                element: <ServiceItem/>,
                                children:[
                                    {
                                        path:"/admin/service/item/index",
                                        element: <IndexServiceItem/>,
                                    },
                                    {
                                        path:"/admin/service/item/add",
                                        element: <AddServiceItem/>
                                    },
                                    {
                                        path:"/admin/service/item/edit/:service_item_id",
                                        element: <EditServiceItem/>
                                    }
                                ]
                            },
                        ]
                    },
                    
            //End Services
            //Portfolio
                    {
                        path:"/admin/portfolio",
                        element: <Portfolio/>,
                        children:[
                            {
                                path:"/admin/portfolio",
                                element: <Navigate to="/admin/portfolio/index"/>,
                            },
                            {
                                path:"/admin/portfolio/index",
                                element: <IndexPortfolio/>,
                            },
                            {
                                path:"/admin/portfolio/add",
                                element: <AddPortfolio/>
                            },
                            {
                                path:"/admin/portfolio/edit/:portfolio_id",
                                element: <EditPortfolio/>,
                            },
                            {
                                path:"/admin/portfolio/button",
                                element: <PortfolioButton/>,
                                children:[
                                    {
                                        path:"/admin/portfolio/button",
                                        element: <Navigate to="/admin/portfolio/button/index"/>,
                                    },
                                    {
                                        path:"/admin/portfolio/button/index",
                                        element: <IndexPortfolioButton/>,
                                    },
                                    {
                                        path:"/admin/portfolio/button/add",
                                        element: <AddPortfolioButton/>
                                    },
                                    {
                                        path:"/admin/portfolio/button/edit/:portfolio_button_id",
                                        element: <EditPortfolioButton/>
                                    },
                                ]
                            },

                        ]
                    },

            //End Portfolio
            //Parallax Section
                    {
                        path:"/admin/parallax",
                        element: <Parallax/>,
                    }, 
                      
            //End Parallax Section  
            
             //Customer Comment
                {
                    path:"/admin/customer/comment",
                    element: <CustomerComment/>,
                    children:[
                        {
                            path:"/admin/customer/comment",
                            element: <Navigate to="/admin/customer/comment/index"/>
                        },                       
                        {
                            path:"/admin/customer/comment/index",
                            element: <IndexCustomerComment/>
                        },
                        {
                            path:"/admin/customer/comment/add",
                            element: <AddCustomerComment/>
                        },
                        {
                            path:"/admin/customer/comment/edit/:customer_comment_id",
                            element: <EditCustomerComment/>
                        },
                    ]
                },
                
            //Customer Mail
                    {
                        path:"/admin/email/inbox",
                        element:<Inbox/>,
                    },
            //User        
                    {
                        path: "/admin/user",
                        element: <User/>,
                        children:[
                            {
                                path: "/admin/user",
                                element: <Navigate to="/admin/user/index"/>
                            },
                            {
                                path:"/admin/user/index",
                                element:<IndexUser/>
                            },
                            {
                                path:"/admin/user/add",
                                element:<AddUser/>
                            },
                            {
                                path:"/admin/user/edit/:user_id",
                                element:<EditUser/>,
                            },
                            {
                                path:"/admin/user/role",
                                element:<Role/>,
                                children:[
                                    {
                                        path:"/admin/user/role",
                                        element: <Navigate to="/admin/user/role/index"/>,
                                    },
                                    {
                                        path:"/admin/user/role/index",
                                        element: <IndexRole/>,
                                    },
                                    {
                                        path:"/admin/user/role/add",
                                        element: <AddRole/>,
                                    },
                                    {
                                        path:"/admin/user/role/edit/:role_id",
                                        element: <EditRole/>
                                    },
                                ]
                            },
                            {
                                path:"/admin/user/message",
                                element:<IndexVisitorMessage/>
                            },

                        ]
                    },
                    
                    
                ]
            }
        ]
    },

   
]);

export default router