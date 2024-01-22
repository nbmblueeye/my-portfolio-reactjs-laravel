import React from 'react'
import PostContext from '../../../context/admin/Post/PostContext'
import { Outlet } from 'react-router-dom'

const Post = () => {
  return (
    <div className="card shadow my_portfolio_section mx-auto">
        <PostContext>
            <Outlet/>
        </PostContext>
    </div>
  )
}

export default Post