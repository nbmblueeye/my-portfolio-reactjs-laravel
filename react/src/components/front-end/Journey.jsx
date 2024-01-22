import React, { useState, useEffect, useRef } from 'react';
import { usePageLoadingContext } from '../../context/PageLoadingContext';
import OverLay from '../OverLay';

const Journey = ( { journeyRef } ) => {

    const { journeys } = usePageLoadingContext();
    const initRef = useRef(true);

    const [activeJourney, setActiveJourney] = useState(1);
    const [showItem, setShowItem]           = useState(false);

    useEffect(() =>{

        if(initRef.current){
            revealItem(journeyRef);
        }
        return () => initRef.current = false;

    }, []);
    

    const _setActiveJourney = (e, id) => {
        e.preventDefault();
        setActiveJourney(id);
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
    
  return (
    <div className="my_portfolio_section journey" ref = { journeyRef }>
        <div className="container">
            <div className="my-portfolio-title-box">
                <h4 className='title'>My Journey</h4>
                <div className='title-line'></div>
            </div>
            <div className="content">
                {
                    journeys.length > 0 ?
                    <>
                        <div className="card-journey-header my_portfolio_line">
                            {
                                journeys.map(( journey, index ) =>      
                                    <div className={`card-journey-header-item my-portfolio-ovelay-box card-journey-header-item-${index + 1} ${activeJourney == journey.id ? "active":""} ${showItem && index == 0 ? "show_journey_left":showItem && index == 1 ? "show_journey_right":""}`} key={index} onClick={(e) => _setActiveJourney(e, journey.id)}>
                                        <div className='image-box-background'>
                                            <img src={`${import.meta.env.VITE_API_BASE_URL}/images/qualifications/${journey.image}`} className="card-img-top" alt={journey.title}/>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{journey.title}</h5>
                                        </div> 
                                        <OverLay data_tooltip="Click to View"/>
                                    </div>
                                )
                            }
                        </div> 
                        <div className={`card-journey-body ${showItem ? "show_journey_bottom":""}`}>
                            {
                                journeys.map(( journey, i ) =>
                                i % 2 == 0 ?      
                                <div className={`card-journey-item even ${activeJourney == journey.id ? "active":""}`} key={i}>
                                    {
                                        journey.qualification_item?.length > 0 &&
                                        journey.qualification_item.map((qualification, j) => 
                                        j % 2 == 0 ? 
                                        <div className="card-journey-item-wrapper even row" key={j}>                               
                                            <div className="col card-journey-item-box">
                                                <div className={`my-portfolio-card my-portfolio-ovelay-box card box-shadow card-number-${j + 1}`}>                                
                                                    <div className="card-body">
                                                        <h5 className='card-title'>{qualification.title}</h5>
                                                        <p className="card-text">{qualification.description}</p>
                                                    </div>
                                                    <OverLay data_tooltip=""/> 
                                                </div>
                                                <div className="my-portfolio-marker"></div>
                                                <div className="my-portfolio-marker-line"></div>  
                                            </div>                          
                                            <div className="col card-journey-item-box-blank">     
                                            </div>                                                          
                                        </div>
                                        :
                                        <div className="card-journey-item-wrapper odd row" key={j}>                              
                                            <div className="col card-journey-item-box-blank">  
                                            </div>                           
                                            <div className="col card-journey-item-box">
                                                <div className={`my-portfolio-card my-portfolio-ovelay-box card box-shadow card-number-${j + 1}`}>                                
                                                    <div className="card-body">
                                                        <h5 className='card-title'>{qualification.title}</h5>
                                                        <p className="card-text">{qualification.description}</p>
                                                    </div> 
                                                    <OverLay data_tooltip=""/>
                                                </div>
                                                <div className="my-portfolio-marker"></div>
                                                <div className="my-portfolio-marker-line"></div>    
                                            </div>                               
                                        </div>
                                        )
                                    }
                                </div>
                                :
                                <div className={`card-journey-item odd ${activeJourney == journey.id ? "active":""}`} key={i}>
                                {
                                    journey.qualification_item?.length > 0 &&
                                    journey.qualification_item.map((qualification, index) => 
                                    index % 2 == 0 ? 
                                    <div className="card-journey-item-wrapper even row" key={index}> 
                                        <div className="col card-journey-item-box-blank">   
                                        </div>                               
                                        <div className="col card-journey-item-box">
                                            <div className={`my-portfolio-card my-portfolio-ovelay-box card box-shadow card-number-${index + 1}`} key={index}>                                
                                                <div className="card-body">
                                                    <h5 className='card-title'>{qualification.title}</h5>
                                                    <p className="card-text">{qualification.description}</p>
                                                </div> 
                                                <OverLay data_tooltip=""/>                         
                                            </div> 
                                            <div className="my-portfolio-marker"></div>
                                            <div className="my-portfolio-marker-line"></div>  
                                        </div>                                                           
                                    </div>
                                    :
                                    <div className="card-journey-item-wrapper odd row" key={index}>                                                          
                                        <div className="col card-journey-item-box">
                                            <div className={`my-portfolio-card my-portfolio-ovelay-box card box-shadow card-number-${index + 1}`} key={index}>                                
                                                <div className="card-body">
                                                    <h5 className='card-title'>{qualification.title}</h5>
                                                    <p className="card-text">{qualification.description}</p>
                                                </div> 
                                                <OverLay data_tooltip=""/>
                                            </div>
                                            <div className="my-portfolio-marker"></div>
                                            <div className="my-portfolio-marker-line"></div>   
                                        </div> 
                                        <div className="col card-journey-item-box-blank">  
                                        </div>                                
                                    </div>
                                    )
                                }
                                </div>
                                )
                            }
                        </div>
                    </>  
                    : 
                    <div className="row d-flex align-items-center">
                        <div className="col-12 p-5">
                            <div className="text-center">
                                <h5>There're no information On Journey Page</h5>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Journey