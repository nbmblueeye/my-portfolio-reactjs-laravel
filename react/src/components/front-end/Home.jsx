import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePageLoadingContext } from '../../context/PageLoadingContext';
import { useSettingContext } from '../../context/SettingContext';

const Home = ( { goToAboutPage, goToContactPage, homeRef } ) => {

    const { home } = usePageLoadingContext();
    const [showItem, setShowItem]           = useState(false);
    const [display, setDisplay]             = useState(false);
    const initRef = useRef(true);

    useEffect(() =>{
        if(initRef.current){
            revealItem(homeRef);
            displayItem(homeRef);
        }
        return () => initRef.current = false; 
    }, []);
  
    const revealItem = (referItem) => {     
        window.addEventListener( 'scroll', () => {
            let screenHeight = window.innerHeight;
            let scrollTop    = referItem.current?.getBoundingClientRect().top;
            if(scrollTop < screenHeight/2){
                setShowItem(true);
            }else{
                setShowItem(false);
            }
        });
    }

    const displayItem = (referItem) => {
        window.addEventListener( 'scroll', () => {
            let screenHeight = window.innerHeight;
            let scrollBottom    = referItem.current?.getBoundingClientRect().bottom;
            if( screenHeight + 150 > scrollBottom ){
                setDisplay(true);
            }else{
                setDisplay(false);
            } 
        });
    }

  return (
    <div className="my_portfolio_section home" ref={ homeRef }>
        <div className="container">
            {
                Object.keys(home).length > 0 ?
                <>
                    <div className="row g-5 d-flex align-items-center p-3">
                        <div className="col-12 col-md-6 order-2 order-md-1">
                            <div className={`information box-shadow ${showItem ? "show_home_left":"hide_home_left"}`}> 
                                <h4 className='title'>{home.title}</h4>
                                <h5 className='sub_title'>{home.sub_title}</h5>
                                <p className='description'>{home.message}</p>       
                                <div className="my-portfolio-button" onClick={(e) => goToContactPage(e)}>
                                    {home.button_text}
                                    <span><i className="bi bi-chevron-right"></i></span> 
                                </div>      
                            </div>
                        </div>
                        <div className="col-12 col-md-6 order-1 order-md-2 d-flex align-items-center justify-content-center">
                            <div className={`avatar ${showItem ? "show_home_right":"hide_home_right"}`} >     
                                <svg className='my-portfolio-avatar my-portfolio-image-background' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="Mask" mask-type="alpha">
                                        <path d="M37.8,-61.7C49.5,-51.4,59.7,-41.7,67.7,-29.4C75.7,-17.1,81.4,-2.3,81.1,12.9C80.8,28.1,74.5,43.6,64,55C53.4,66.4,38.6,73.6,23.9,75C9.2,76.4,-5.3,72,-19.9,67.8C-34.5,63.5,-49.2,59.4,-62.1,50.5C-75,41.6,-86.2,27.8,-86.1,13.7C-86.1,-0.4,-74.9,-14.7,-65.7,-28C-56.5,-41.3,-49.4,-53.6,-38.8,-64.3C-28.2,-75.1,-14.1,-84.3,-0.5,-83.5C13.1,-82.7,26.2,-71.9,37.8,-61.7Z" transform="translate(100 100)" width="100%" height="100%"/>
                                    </mask> 
                                    <g mask="url(#Mask)">
                                        <path  d="M37.8,-61.7C49.5,-51.4,59.7,-41.7,67.7,-29.4C75.7,-17.1,81.4,-2.3,81.1,12.9C80.8,28.1,74.5,43.6,64,55C53.4,66.4,38.6,73.6,23.9,75C9.2,76.4,-5.3,72,-19.9,67.8C-34.5,63.5,-49.2,59.4,-62.1,50.5C-75,41.6,-86.2,27.8,-86.1,13.7C-86.1,-0.4,-74.9,-14.7,-65.7,-28C-56.5,-41.3,-49.4,-53.6,-38.8,-64.3C-28.2,-75.1,-14.1,-84.3,-0.5,-83.5C13.1,-82.7,26.2,-71.9,37.8,-61.7Z" transform="translate(100 100)" width="100%" height="100%"/>
                                        {
                                            home.image ?  
                                            <image className='my-avatar' href={`${import.meta.env.VITE_API_BASE_URL}/images/homes/${home.image}`} x="10" y="0" />                                        
                                            :
                                            ""
                                        }                               
                                    </g> 
                                </svg> 
                            </div>
                        </div>          
                        <div className="col-12 order-3">
                            <div className="row">
                                <div className={`col-12 col-lg-6 my-portfolio-social-media-box bottom ${display ? "show_home_bottom":"hide_home_bottom"}`}> 
                                    <div className="left-box"> 
                                        <div className="my-portfolio-scroll-down-box">
                                            <div className="scroll-down blur" onClick={(e) => goToAboutPage(e)}>
                                                <span className='mouse-icon'><i className="bi bi-mouse2-fill"></i></span>
                                                <span>Scroll down</span>
                                                <span className='down-arrow-icon icon'><i className="bi bi-arrow-bar-down"></i></span>
                                            </div>
                                        </div>    
                                    </div>
                                    <div className="social-media">
                                        <div className='icon facebook'>
                                            <Link to={`${home.facebook_url ? home.facebook_url:"#"}`} target='_blank' rel='noreferrer'>
                                                <i className="bi bi-facebook"></i>
                                            </Link>
                                        </div>
                                        <div className='icon instagram'>
                                            <Link to={`${home.instagram_url ? home.instagram_url:"#"}`} target='_blank' rel='noreferrer'>
                                                <i className="bi bi-instagram"></i>
                                            </Link>
                                        </div>
                                        <div className='icon linkedin'>
                                            <Link to={`${home.linkedin_url ? home.linkedin_url:"#"}`} target='_blank' rel='noreferrer'>
                                                <i className="bi bi-linkedin"></i>
                                            </Link>
                                        </div>
                                        <div className='icon youtube'>
                                            <Link to={`${home.youtube_url ? home.youtube_url:"#"}`} target='_blank' rel='noreferrer'>
                                                <i className="bi bi-youtube"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>              
                    </div>
                    <div className={`my-portfolio-social-media-box left ${showItem ? "show_home_right_absolute":"hide_home_right_absolute"}`}>          
                        <div className="social-media">
                            <div className='icon facebook'>
                            <Link to={`${home.facebook_url ? home.facebook_url:"#"}`} target='_blank' rel='noreferrer'>
                                <i className="bi bi-facebook"></i>
                            </Link>
                            </div>
                            <div className='icon instagram'>
                            <Link to={`${home.instagram_url ? home.instagram_url:"#"}`} target='_blank' rel='noreferrer'>
                                <i className="bi bi-instagram"></i>
                            </Link>
                            </div>
                            <div className='icon linkedin'>
                            <Link to={`${home.linkedin_url ? home.linkedin_url:"#"}`} target='_blank' rel='noreferrer'>
                                <i className="bi bi-linkedin"></i>
                            </Link>
                            </div>
                            <div className='icon youtube'>
                            <Link to={`${home.youtube_url ? home.youtube_url:"#"}`} target='_blank' rel='noreferrer'>
                                <i className="bi bi-youtube"></i>
                            </Link>
                            </div>
                        </div>
                    </div>  
                </>
                : 
                <div className="row d-flex align-items-center">
                    <div className="col">
                        <div className="text-center">
                            <h5>There're no information On Home Page</h5>
                        </div>
                    </div>
                </div>
            }
                     
        </div>
    </div>
    
  )
}

export default Home