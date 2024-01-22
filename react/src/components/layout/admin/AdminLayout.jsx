import React, { useState, useEffect } from 'react'
import Header from './Header'
import SideBar from './SideBar'
import { useThemeModeContext } from '../../../context/ThemeModeContext'
import Content from './Content'
import MyPorfolioHelmet from '../../Helmet'
import { useSettingContext } from '../../../context/SettingContext'
import Footer from './Footer'

const AdminLayout = () => {

  const [showSideBar, setShowSideBar] = useState(true);
  const { state, setCurrentThemeMode } = useThemeModeContext();
  const { settings } = useSettingContext();

  useEffect(() => {
    setCurrentThemeMode();
  }, [state.themeModes])

  const _setShowSideBar = (e) => {
    e.preventDefault();
    setShowSideBar(() => !showSideBar);
  }

  return (
    <div className={`my_portfolio_body ${state.activeMode.mode}`}>
      <MyPorfolioHelmet title={{name: "My Portforlio Admin"}}/>
      <Header showSideBar={showSideBar} setShowSideBar={_setShowSideBar} settings={settings}/>
      <div className="my_portfolio_main">
            <div className={`my_portfolio_admin ${showSideBar ? "":"hide-side-bar"}`}> 
              <div className="container">
                <div className={`admin-column side-bar my_portfolio_section ${showSideBar ? "hide-side-bar":""}`}>
                  <SideBar/>
                </div>
                <div className="admin-column content">
                  <Content/>
                </div>
              </div>
            </div>
      </div>
      <Footer settings={settings} />
    </div>
  )
}

export default AdminLayout
