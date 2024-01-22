import React from 'react'
import QualificationDetailContext from '../../../../context/admin/Qualification/QualificationDetailContext'
import { Outlet } from 'react-router-dom'

const QualificationDetail = () => {
  return (
    <QualificationDetailContext>
      <Outlet/>
    </QualificationDetailContext>
  )
}

export default QualificationDetail