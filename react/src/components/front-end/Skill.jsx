import React, { useState, useEffect, useRef } from 'react';
import { usePageLoadingContext } from '../../context/PageLoadingContext';
import axiosClient from '../../axiosClient';
import OverLay from '../OverLay';

const Skill = ( { skillRef } ) => {

  const { skills }           = usePageLoadingContext();
  const initRef = useRef(true);

  const [showItem, setShowItem]   = useState(false);
  const [display, setDisplay]     = useState(false);
  const [active, setActive]       = useState(parseInt(1));
 
  useEffect(() =>{
    if(initRef.current){
      revealItem(skillRef);
      displayItem(skillRef);
    }
    return () => initRef.current = false;
  }, []);

  const _setSlideDown = (id, e) => {
    e.preventDefault();
    setActive(id);
  }

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
      if( screenHeight + screenHeight/4 > scrollBottom ){
          setDisplay(true);
      }else{
          setDisplay(false);
      }   
    });
}

  return (
    <div className="my_portfolio_section skill" ref = { skillRef }>
      <div className="container">
          <div className="my-portfolio-title-box">
              <h4 className='title'>My Skill</h4>
              <div className='title-line'></div>
          </div>
          <div className="content">
              {
                skills.length > 0 ?
                <div className={`row row-cols-1 row-cols-md-${skills.length} g-5 g-md-3 g-lg-5`}>
                  {
                    skills.map(( skill, index ) => 
                    <div className="col" key={index}>
                      <div className={`my-portfolio-card box-shadow card-number-${index + 1} ${showItem && index == 0 ? "show_skill_left":""} ${display && index == 1 ? "show_skill_bottom":display && index == 2 ? "show_skill_right":""}` }>
                        <div className="card-skill-header my_portfolio_line my-portfolio-ovelay-box">
                          <div className='image-box-background my_portfolio_line'>
                            <img src={`${import.meta.env.VITE_API_BASE_URL}/images/skills/${skill.image}`} className="card-img-top" alt={skill.title}/>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{skill.title}</h5>
                            <p className="card-text">{skill.description}</p>
                            <div className="my_portfolio_slide_down">  
                              <i className="bi bi-chevron-down"></i>
                            </div>
                          </div>
                          <OverLay data_tooltip="Please Click to see detail" id={skill.id} _setModal = {_setSlideDown}/>
                        </div>
                        <div className={`card-skill-body ${active == skill.id ? "active":""}`} >
                            {
                              skill.skill_item?.length > 0 &&
                              skill.skill_item.map((item, index) =>
                                <div className="skill-item" key={index}>
                                  <div className="skill-item-content">
                                    <h5 className="cart-title">{item.title}</h5>
                                    <p className="cart-text px-2">{item.description}</p>
                                  </div>
                                  <div className="skill-item-box my_portfolio_border">
                                    <div className="skill-item-box-inner" style={{width:`${item.percent}%`}}>
                                    </div>
                                  </div>
                                </div>
                              )
                            }                   
                        </div>
                      </div>
                    </div>
                    )
                  }
                </div>     
                : 
                <div className="row d-flex align-items-center">
                  <div className="col-12 p-5">
                      <div className="text-center">
                          <h5>There're no information On Skill Page</h5>
                      </div>
                  </div>
                </div>

              }
          </div>
      </div>
    </div>
  )
}

export default Skill