import React, { useContext, createContext, useReducer } from 'react';

const initThemeMode = {
  themeModes:[
    {
      icon:"bi bi-circle-half",
      mode: 'auto',
      status: 'active'
    },
    {
      icon:"bi bi-brightness-high",
      mode: 'light',
      status: ''
    },
    {
      icon:"bi bi-moon-stars",
      mode: 'dark',
      status: ''
    }
  ],
  activeMode: {
    icon:"",
    mode: "",
    status: "",
  },
}

const setThemeMode =  (state, action) => {
  switch (action.type) {
    case "setActiveThemeMode":
      return {
        ...state, themeModes: state.themeModes.map(themeMode => themeMode.mode == action.payload ? {...themeMode, status:"active"} : {...themeMode, status:""}),
      };

    case "setCurrentThemeMode":
      return {
        ...state, activeMode: action.payload[0],
      };
  
    default:
      return state;
  }

} 

const createThemeModeContext = createContext(initThemeMode);

export const useThemeModeContext = () => useContext(createThemeModeContext);

const ThemeModeContext = ( {children} ) => {
    
  const [state, dispatch] = useReducer(setThemeMode, initThemeMode);

  const setActiveThemeMode = (mode) => {
    dispatch({type:"setActiveThemeMode", payload: mode});
  } 

  const setCurrentThemeMode = () => {
    dispatch({type:"setCurrentThemeMode", payload: state.themeModes.filter(themeMode => themeMode.status ==  "active")});
  } 
 

  return (
    <createThemeModeContext.Provider value={{ state, setActiveThemeMode, setCurrentThemeMode }}>
        {children}
    </createThemeModeContext.Provider>
  )
}

export default ThemeModeContext