import React, { useEffect, useRef } from 'react';
import Portfolio from '../../../components/front-end/Portfolio'
import Home from '../../../components/front-end/Home'
import Service from '../../../components/front-end/Service';
import About from '../../../components/front-end/About';
import Skill from '../../../components/front-end/Skill';
import Journey from '../../../components/front-end/Journey';
import Parallax from '../../../components/front-end/Parallax';
import Contact from '../../../components/front-end/Contact';
import Customer from '../../../components/front-end/Customer';
import ScrollTop from '../../../components/ScrollTop';
import { useScrollToSectionContext } from '../../../context/front-end/ScrollToSectionContext';
import PageLoading from '../../../components/PageLoading';
import { usePageLoadingContext } from '../../../context/PageLoadingContext';


const FrontPage = () => {

  const { pageLoading, setRefresh } = usePageLoadingContext();

  const portfolioRef    = useRef(null);
  const serviceRef      = useRef(null);
  const homeRef         = useRef(null);
  const aboutRef        = useRef(null);
  const skillRef        = useRef(null);
  const journeyRef      = useRef(null);
  const contactRef      = useRef(null);
  const customerRef     = useRef(null);
  
  const { sectionRefs } = useScrollToSectionContext();
  const initPage = useRef(true);

  useEffect(() => {
    if(initPage.current){
      sectionRefs.current = [
        portfolioRef,
        serviceRef,
        homeRef,
        aboutRef,
        skillRef,
        journeyRef,
        contactRef,
        customerRef,
      ]; 
  
      setRefresh(true);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    }
    return () => setRefresh(false);
  }, [])

  const goToHomePage = (e) => {
    e.preventDefault();
    window.scrollTo({
        top: homeRef.current?.offsetTop,
        behavior: 'smooth',
    });
  };
  
  const goToAboutPage = (e) => {
    e.preventDefault();
    window.scrollTo({
        top: aboutRef.current?.offsetTop,
        behavior: 'smooth',
    });
  };

  const goToContactPage = (e) => {
    e.preventDefault();
    window.scrollTo({
        top: contactRef.current?.offsetTop,
        behavior: 'smooth',
    });
  };

  let output = "";
  if(pageLoading){
    output = <PageLoading/>;
  }else{
    output = (
      <>
        <Portfolio portfolioRef={portfolioRef}/>
        <Service serviceRef = { serviceRef } goToHomePage={goToHomePage}/>
        <Home homeRef={homeRef} goToAboutPage={goToAboutPage} goToContactPage={goToContactPage}/>
        <About aboutRef={aboutRef}/>
        <Skill skillRef={skillRef}/>
        <Journey journeyRef={journeyRef}/>
        <Parallax/>
        <Contact contactRef={contactRef}/>
        <Customer customerRef={ customerRef }/>
        <ScrollTop serviceRef={ serviceRef }/>
      </>
    )
  }

  return (
    <>
      {output}
    </>
  )
}
export default FrontPage