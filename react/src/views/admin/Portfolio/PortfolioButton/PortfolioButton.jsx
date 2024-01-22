import React from 'react'
import PortfolioButtonContext from '../../../../context/admin/Portfolio/PortfolioButtonContext'
import { Outlet } from 'react-router-dom'

const PortfolioButton = () => {
  return (
    <>
        <PortfolioButtonContext>
          <Outlet/>
        </PortfolioButtonContext>
    </>
  )
}

export default PortfolioButton