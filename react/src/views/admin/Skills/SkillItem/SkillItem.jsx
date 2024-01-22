import React from 'react'
import SkillItemContext from '../../../../context/admin/Skill/SkillItemContext'
import { Outlet } from 'react-router-dom'

const SkillItem = () => {
  return (
    <>
       <SkillItemContext>
          <Outlet/>
       </SkillItemContext>
    </>
  )
}

export default SkillItem
