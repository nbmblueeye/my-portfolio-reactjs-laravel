import React from 'react'
import { Outlet } from 'react-router-dom'
import SkillContext from '../../../context/admin/Skill/SkillContext';
import ServiceContext from '../../../context/admin/Service/ServiceContext';
import QualificationContext from '../../../context/admin/Qualification/QualificationContext';
import CustomerCommentContext from '../../../context/admin/CustomerComment/CustomerCommentContext';

const Content = () => {
  return (
    <div className='my_portfolio_admin_content'>
       <div className="wrapper">
          <SkillContext>
            <ServiceContext>
              <QualificationContext>
                <CustomerCommentContext>
                  <Outlet/>
                </CustomerCommentContext>
              </QualificationContext>
            </ServiceContext>
          </SkillContext>
      </div>
    </div>
  )
}

export default Content