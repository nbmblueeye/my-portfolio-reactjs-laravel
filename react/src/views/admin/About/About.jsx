import React from 'react'
import { Outlet } from 'react-router-dom'
import AboutContext from '../../../context/admin/About/AboutContext'

const About = () => {
  return (
    <div className="card shadow my_portfolio_section mx-auto">
      <AboutContext>
        <Outlet/>
      </AboutContext>
    </div>
  )
}

export default About