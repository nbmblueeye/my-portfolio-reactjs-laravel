import React, { useState, useEffect, useRef } from 'react';
import { usePageLoadingContext } from '../../context/PageLoadingContext';
import OverLay from '../OverLay';

const About = ( { aboutRef } ) => {

  const { about } = usePageLoadingContext();
  const initRef = useRef(true);

  const [showItem, setShowItem]           = useState(false);
  const [display, setDisplay]             = useState(false);
 
  useEffect(() =>{
    
    if(initRef.current){
      revealItem(aboutRef);
      displayItem(aboutRef);
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
    <div className="my_portfolio_section about" ref={ aboutRef }>
      <div className="container">
          <div className="my-portfolio-title-box">
              <h4 className='section_title'>About</h4>
              <div className='title-line'></div>
          </div>
          <div className="content">
              {
                Object.keys(about).length > 0 ?
                <>
                  <div className="row g-3 introduction-box">
                    <div className="col-12 col-md-5">
                      <div className={`about-image-box image-box-background box-shadow ${showItem ? "show_about_left":"hide_about_left"}`} >  
                        {
                          about.image ?  
                          <img src={`${import.meta.env.VITE_API_BASE_URL}/images/abouts/${about.image}`} alt="portfolio-home-img"/>
                          :
                          <img src={`${import.meta.env.VITE_API_BASE_URL}/images/no-image.png`} alt="portfolio-no-img"/>
                        }  
                      </div>
                    </div>          
                    <div className="col-12 col-md-7">
                        <div className={`introduction my_portfolio_line ${showItem ? "show_about_right":"hide_about_right"}`}>
                          <h3 className='title'>{about.title}</h3>
                          <div className='sub_title' dangerouslySetInnerHTML={{ __html: about.sub_title }}></div>
                          <p className='description'>{about.introduction}</p>
                        </div>
                        <div className={`working-history`}>
                            <div className="row row-cols-1 row-cols-md-3 g-5 g-md-3">
                                {
                                  about.about_item?.length > 0 &&
                                  about.about_item.map((item, index) => 
                                  <div className="col" key={index}>
                                      <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow card-number-${index + 1} ${display ? "show_about_bottom":"hide_about_bottom"}`}>
                                        <div className='image-box-background my_portfolio_line'>
                                          <img src={`${import.meta.env.VITE_API_BASE_URL}/images/abouts/${item.image}`} className="card-img-top" alt={item.title}/>
                                        </div>
                                        <div className="card-body">
                                          <h5 className="card-title">{item.title}</h5>
                                          <p className="card-text">{item.description}</p>
                                        </div>
                                        <OverLay data_tooltip=""/>
                                      </div>
                                  </div>
                                  )
                                }
                            </div>
                        </div>
                    </div>             
                  </div>
                  <div className="working-history-small">
                    <div className="row row-cols-1 g-3">
                      {
                        about.about_item?.length > 0 &&
                        about.about_item.map((item, index) => 
                        <div className="col" key={index}>
                            <div className={`my-portfolio-card box-shadow card-number-${index + 1} ${display ? "show_about_bottom":"hide_about_bottom"}`}>
                              <div className='image-box-background my_portfolio_line'>
                                <img src={`${import.meta.env.VITE_API_BASE_URL}/images/abouts/${item.image}`} className="card-img-top" alt={item.title}/>
                              </div>
                              <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">{item.description}</p>
                              </div>
                            </div>
                        </div>
                        )
                      }
                    </div>
                  </div>  
                </>
                : 
                <div className="row d-flex align-items-center">
                  <div className="col-12">
                      <div className="text-center">
                          <h5>There're no information on About Page</h5>
                      </div>
                  </div>
                </div>
              }
          </div>
      </div>
    </div>
  )
}

export default About