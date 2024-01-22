import React from 'react'
import { Outlet } from 'react-router-dom'
import QualificationItemContext from '../../../../context/admin/Qualification/QualificationItemContext'

const QualificationItem = () => {
  return (
    <>
        <QualificationItemContext>
          <Outlet/>
        </QualificationItemContext>
    </>
  )
}

export default QualificationItem
