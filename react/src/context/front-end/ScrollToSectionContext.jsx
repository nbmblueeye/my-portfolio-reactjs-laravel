import React, { createContext, useContext, useRef, useState } from 'react';

const scrollToSectionContext = createContext({
    navActive:0,
    setNavActive:()=>{},
    sectionRefs:null,
    setScrollToSectionContext:()=>{},
})

export const useScrollToSectionContext = () => {
    return useContext(scrollToSectionContext);
}

const ScrollToSectionContext = ({ children }) => {

    const [navActive, setNavActive]     = useState(100);
    const sectionRefs                   = useRef([]);

    const Nav_Items = [
        { name: 'Portfolio', navLink:"#"},
        { name: 'Services', navLink:"#"},
        { name: 'Home', navLink:"#"},
        { name: 'About', navLink:"#"},
        { name: 'Skills', navLink:"#"},
        { name: 'Journey', navLink:"#"},
        { name: 'Contact', navLink:"#"},
        { name: 'Customer', navLink:"#"},
        { name: 'Blogs', navLink:"/my-blogs"},
      ];
    

    const setScrollToSectionContext     = (section_id) => {
        sectionRefs.current.map((sectionRef, index) => {
            if(!sectionRef.current){
                return false;
            }else if( index == 1 && section_id == 1){
                let scrollTop = sectionRef.current?.offsetHeight;
                window.scrollTo(
                    0,
                    scrollTop,
                    'smooth',
                )
            }else if( index != 1 && section_id == index){
                window.scrollTo({
                    top: sectionRef.current?.offsetTop,
                    behavior: 'smooth',
                });
            }      
        });
    }

    const data = {
        Nav_Items,
        navActive,
        setNavActive,
        sectionRefs,
        setScrollToSectionContext,
    }

  return (
    <scrollToSectionContext.Provider value={data}>
        { children }
    </scrollToSectionContext.Provider>
  )
}

export default ScrollToSectionContext