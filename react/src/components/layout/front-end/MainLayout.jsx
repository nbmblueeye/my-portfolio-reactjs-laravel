import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useThemeModeContext } from '../../../context/ThemeModeContext';
import Header from './Header';
import Footer from './Footer';
import OnscrollRevealContext from '../../../context/front-end/OnscrollRevealContext';

import { useSettingContext } from '../../../context/SettingContext';
import ScrollToSectionContext from '../../../context/front-end/ScrollToSectionContext';

const MainLayout = () => {
  const { state, setCurrentThemeMode } = useThemeModeContext();
  const { settings } = useSettingContext();

  useEffect(() => {
    setCurrentThemeMode();
  }, [state.themeModes])

  return (
    
    <div className={`my_portfolio_body ${state.activeMode.mode}`}> 
      <ScrollToSectionContext> 
        <Header settings={settings} />
        <div className="my_portfolio_main">
            <OnscrollRevealContext>
              <Outlet/>
            </OnscrollRevealContext>
        </div>
        <Footer settings={settings}/>
      </ScrollToSectionContext>
    </div>
    
  )
}

export default MainLayout