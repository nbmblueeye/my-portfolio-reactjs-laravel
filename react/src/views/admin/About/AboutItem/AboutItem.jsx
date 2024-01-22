import React from 'react'
import { Outlet } from 'react-router-dom'
import AboutItemContext from '../../../../context/admin/About/AboutItemContext'

const AboutItem = () => {
  return (
    <AboutItemContext>
       <Outlet/>
    </AboutItemContext>
  )
}

export default AboutItem