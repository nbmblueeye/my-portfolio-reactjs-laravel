import React from 'react'
import { Outlet } from 'react-router-dom'

const CustomerComment = () => {
  return (
    <div className="card shadow my_portfolio_section mx-auto">
      <Outlet/>
    </div>
  )
}

export default CustomerComment