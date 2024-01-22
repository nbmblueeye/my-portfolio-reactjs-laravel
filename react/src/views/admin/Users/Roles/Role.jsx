import React from 'react'
import AdminRoleContext from '../../../../context/admin/User/AdminRoleContext'
import { Outlet } from 'react-router-dom';

const Role = () => {
  return (
    <>
      <AdminRoleContext>
          <Outlet/>
      </AdminRoleContext>
    </>
  )
}

export default Role