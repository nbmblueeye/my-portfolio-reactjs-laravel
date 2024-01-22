import React from 'react'
import { Outlet } from 'react-router-dom'

const Service = () => {
  return (
    <div className="card shadow my_portfolio_section">
        
          <Outlet/>
        
    </div>
  )
}

export default Service