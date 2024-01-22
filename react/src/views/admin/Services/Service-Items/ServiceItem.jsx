import React from 'react'
import ServiceItemContext from '../../../../context/admin/Service/ServiceItemContext'
import { Outlet } from 'react-router-dom'

const ServiceItem = () => {
  return (
    <>
        <ServiceItemContext>
          <Outlet/>
        </ServiceItemContext>
    </>
  )
}

export default ServiceItem