import React from 'react'
import { useThemeModeContext } from '../../context/ThemeModeContext';

const ThemeAction = ({ themeDropdown, _setThemeModeDropdown }) => {

    const {state , setActiveThemeMode } = useThemeModeContext();

  return (
    <>
        <li className="nav-item my_portfolio_dropdown theme-mode" onClick={() => _setThemeModeDropdown()}>
            <a className="nav-link dropdown-toggle" role="button">
                <i className={`${state.activeMode.icon} fs-5`}></i>
            </a>
            <ul className={`my_portfolio_dropdown_menu ${themeDropdown ? "drop-down":""}`}>
                <li className="dropdown-item"><a href="#" onClick={() => setActiveThemeMode('light')}><i className="bi bi-brightness-high fs-5 me-2"></i> <span>Light</span></a></li>
                <li className="dropdown-item"><a href="#" onClick={() => setActiveThemeMode('dark')}><i className="bi bi-moon-stars fs-5 me-2"></i> <span>Dark</span></a></li>
                <div className="my_portfolio_dropdown_divider"></div>
                <li className="dropdown-item"><a  href="#" onClick={() => setActiveThemeMode('auto')}><i className="bi bi-circle-half fs-5 me-2"></i> <span>Auto</span></a></li>
            </ul>
        </li>
    </>
  )
}

export default ThemeAction