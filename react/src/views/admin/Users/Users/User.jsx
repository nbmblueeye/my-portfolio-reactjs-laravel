import React from 'react'
import AdminUserContext from '../../../../context/admin/User/AdminUserContext'
import { Outlet } from 'react-router-dom'

const User = () => {
  return (
    <div className="card shadow my_portfolio_section mx-auto">
        <AdminUserContext>
            <Outlet/>
        </AdminUserContext>
    </div>
  )
}

export default User