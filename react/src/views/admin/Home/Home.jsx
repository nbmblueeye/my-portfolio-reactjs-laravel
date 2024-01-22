import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeContext from '../../../context/admin/Home/HomeContext';

const Home = () => {

  return (  
    <div className="card shadow my_portfolio_section mx-auto">
      <HomeContext>
       <Outlet/>
      </HomeContext>
    </div>
  )
}

export default Home
