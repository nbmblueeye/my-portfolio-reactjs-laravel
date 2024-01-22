import React, { createContext, useContext, useState } from 'react';

const initonscrollRevealContext = createContext({
    revealItem: () => {},
    showItem:false,
    displayItem:() => {},
    display:false,
});

export const useOnScrollRevealContext = () => useContext( initonscrollRevealContext );

const OnscrollRevealContext = ( { children } ) => {

    const [showItem, setShowItem] = useState(false);
    const [display, setDisplay] = useState(false);

    const revealItem = (referItem, distance) => {
        if(referItem.current != null){
            window.addEventListener( 'scroll', () => {
                let screenHeight = window.innerHeight;
                let scrollTop    = referItem.current.getBoundingClientRect().top;
                if(scrollTop < screenHeight/2 + distance){
                    setShowItem(true);
                }else{
                    setShowItem(false);
                }    
            });
        }else{
            return false;
        }
    }

    const displayItem = (referItem, distance) => {
        if(referItem.current != null){
            window.addEventListener( 'scroll', () => {
                let screenHeight = window.innerHeight;
                let scrollBottom    = referItem.current.getBoundingClientRect().bottom;
                if( screenHeight + distance > scrollBottom ){
                    setDisplay(true);
                }else{
                    setDisplay(false);
                } 
            });
        }else{
            return false;
        }
    }

    const data ={
        revealItem,
        showItem,
        displayItem,
        display,
    };

  return (
    <initonscrollRevealContext.Provider value={data}>
        {children}
    </initonscrollRevealContext.Provider>
  )
}

export default OnscrollRevealContext