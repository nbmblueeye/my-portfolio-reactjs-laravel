import React from 'react'
import PortfolioContext from '../../../context/admin/Portfolio/PortfolioContext'
import { Outlet } from 'react-router-dom'

const Portfolio = () => {
  return (
    <div className="card shadow my_portfolio_section mx-auto">
        <PortfolioContext>
          <Outlet/>
        </PortfolioContext>
    </div>
  )
}

export default Portfolio