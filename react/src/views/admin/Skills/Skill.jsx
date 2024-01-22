import React from 'react'
import { Outlet } from 'react-router-dom'


const Skill = () => {
  return (
    <div className="card shadow my_portfolio_section mx-auto">
      <Outlet/>
    </div>
  )
}

export default Skill
