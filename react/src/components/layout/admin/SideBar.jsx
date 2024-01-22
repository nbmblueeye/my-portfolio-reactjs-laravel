import React, { useState, useRef } from 'react';
import SideBarItem from './SideBarItem';
import { useUserContext } from '../../../context/front-end/UserContext';

const SideBar = () => {
  
  const userContext = useUserContext(); 
  const sideBarRef = useRef([]);

  const [activeItems, setActiveItem] = useState([
     {name:"DashBoard", status:false, icon:"bi bi-pie-chart", link:"/admin/dashboard", signal:"", items:[]},
     
     {name:"My Blogs", status:false, icon:"bi bi-stickies", link:"/admin/my-blog", signal:"bi bi-chevron-double-down", items:[{name:'Header Image', link:"/admin/my-block"}, {name:'Post', link:"/admin/post/index"}]},
    
     {name:"Home", status:false, icon:"bi bi-house-add", link:"/admin/home/index", signal:"", items:[]},
    
     {name:"About", status:false, icon:"bi bi-exclamation-square", link:"/admin/about", signal:"bi bi-chevron-double-down", items:[{name:'About', link:"/admin/about/index"}, {name:'About-Item', link:"/admin/about/item/index"}]},
     
     {name:"Skill", status:false, icon:"bi bi-person-gear", link:"/admin/skills", signal:"bi bi-chevron-double-down", items:[{name:'Skills', link:"/admin/skills/index"}, {name:'Skill-Item', link:"/admin/skills/item/index"}]},
     
     {name:"Qualifications", status:false, icon:"bi bi-journals", link:"/admin/qualification", signal:"bi bi-chevron-double-down", items:[{name:'Qualifications', link:"/admin/qualification/index"}, {name:'Qualification-Items', link:"/admin/qualification/item/index"}, {name:'Qualification-Details', link:"/admin/qualification/detail/index"}]},
     
     {name:"Services", status:false, icon:"bi bi-person-workspace", link:"/admin/service", signal:"bi bi-chevron-double-down", items:[{name:'Services', link:"/admin/service/index"}, {name:'Service-Items', link:"/admin/service/item/index"}]},

     {name:"Portfolios", status:false, icon:"bi bi-card-checklist", link:"/admin/portfolio", signal:"bi bi-chevron-double-down", items:[{name:'Portfolios', link:"/admin/portfolio/index"}, {name:'Portfolio Button', link:"/admin/portfolio/button/index"}]},
     
     userContext.user.role == "Admin" && {name:"Users", status:false, icon:"bi bi-person-add", link:"/admin/user", signal:"bi bi-chevron-double-down", items:[{name:'Users', link:"/admin/user/index"}, {name:'Roles', link:"/admin/user/role/index"}, {name:'Message', link:"/admin/user/message"}]},
     
      {name:"Emails", status:false, icon:"bi bi-envelope", link:"/admin/emails", signal:"bi bi-chevron-double-down", items:[{name:'Message', link:"#"}]},
     
     {name: "Parallax", status: false , icon:"bi bi-gear", link:"/admin/parallax", signal:"", items:[]},
    
     {name: "Customer Comment", status: false , icon:"bi bi-person-check-fill", link:"/admin/customer/comment/index", signal:"", items:[]},
     
     {name: "Web Setting", status: false , icon:"bi bi-gear", link:"/admin/setting", signal:"", items:[]},
  ]);

   
  return (
    <div className='my_portfolio_admin_sidebar'>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem}  name="DashBoard" sideBarRef={sideBarRef}/>

        <div className="row fw-light my_portfolio_admin_divider">
          <div className="col-auto">Blogs</div>
          <div className="col line"></div>
        </div>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem}  name="My Blogs" sideBarRef={sideBarRef}/>

        <div className="row fw-light my_portfolio_admin_divider">
          <div className="col-auto">Page</div>
          <div className="col line"></div>
        </div>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem} name="Home" sideBarRef={sideBarRef}/>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem} name="About" sideBarRef={sideBarRef}/>
       
        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem} name="Skill" sideBarRef={sideBarRef}/>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem} name="Qualifications" sideBarRef={sideBarRef}/>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem} name="Services" sideBarRef={sideBarRef}/>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem} name="Portfolios" sideBarRef={sideBarRef}/>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem} name="Parallax" sideBarRef={sideBarRef}/>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem} name="Customer Comment" sideBarRef={sideBarRef}/>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem} name="Users" sideBarRef={sideBarRef}/>

        <div className="row fw-light my_portfolio_admin_divider">
          <div className="col-auto">App</div>
          <div className="col line"></div>
        </div>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem} name="Emails" sideBarRef={sideBarRef}/>

        <div className="row fw-light my_portfolio_admin_divider">
          <div className="col-auto">Web Setting</div>
          <div className="col line"></div>
        </div>

        <SideBarItem activeItems = {activeItems} setActiveItem={setActiveItem} name="Web Setting" sideBarRef={sideBarRef}/>

    </div>
  )
}

export default SideBar
