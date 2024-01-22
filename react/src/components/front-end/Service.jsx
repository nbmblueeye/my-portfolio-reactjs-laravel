import React, { useState, useEffect, useRef } from 'react';
import axiosClient from '../../axiosClient';
import { usePageLoadingContext } from '../../context/PageLoadingContext';
import OverLay from '../OverLay';
import PortfolioModal from '../PortfolioModal';

const Service = ( { goToHomePage, serviceRef } ) => {

    const { services }  = usePageLoadingContext();
    const [display, setDisplay]             = useState(false);

    const [modal, setModal]           = useState(null);
    const _setModal = (id, e) => {
        e.preventDefault();
        setModal(id);
    }

    useEffect(() =>{
        displayItem(serviceRef);  
    }, []);

    const displayItem = (referItem) => {   
        window.addEventListener( 'scroll', () => {  
            let screenHeight = window.innerHeight;
            let scrollBottom    = referItem.current?.getBoundingClientRect().bottom;
            if( screenHeight > scrollBottom - 200){
                setDisplay(true);
            }else{
                setDisplay(false);
            } 
        });
    }

    return (
        <>
            <div className="my_portfolio_section service" ref={serviceRef}>
                <div className="container">
                    <div className="content">
                        {
                            services.length > 0?       
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-5">
                                {
                                    services.map((service,index) => 
                                        <div className={`col`} key={index}>
                                            <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow card-number-${index + 1} ${display ? "show-card":""}`} >                             
                                                <div className='image-box-background my_portfolio_line'>
                                                    {
                                                        service.image ?
                                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/images/services/${service.image}`} className="card-img-top" alt="portfolio-home-img" loading='lazy'/>
                                                        :
                                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/images/no-image.png`} className="card-img-top" alt="portfolio-home-img" loading='lazy'/>
                                                    } 
                                                </div>    
                                                <div className="card-body">
                                                    <h5 className='card-title'>{service.title}</h5>
                                                </div>                       
                                                <OverLay data_tooltip="Please Click to see detail" id={service.id} _setModal={_setModal}/>
                                            </div>                     
                                        </div> 
                                    )              
                                }
                            </div>      
                            :       
                            <div className="my_portfolio_section py-5">               
                                <h5 className='text-center'>There're no Services</h5> 
                            </div>  
                        }
                        <div className={`my-portfolio-scroll-down-box ${display ? "show-card":""}`} >
                            <div className="scroll-down blur" onClick={(e) => goToHomePage(e)}>
                                <span className='mouse-icon'><i className="bi bi-mouse2-fill"></i></span>
                                <span>Scroll down</span>
                                <span className='down-arrow-icon icon'><i className="bi bi-arrow-bar-down"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            {
                services.map((service,index) => 
                    <div key={index}>
                        <PortfolioModal  title={service.title} modal_datas={service.service_item} display={service.id == modal ? "active":""} _setModal={_setModal}/>                     
                    </div> 
                )              
            }
        </>
    )
}

export default Service