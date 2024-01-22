import React, { useState, useEffect, useRef, useCallback } from 'react';
import Swiper from 'swiper/bundle';
import { usePageLoadingContext } from '../../context/PageLoadingContext';
import OverLay from '../OverLay';
import { Link} from 'react-router-dom'

const Customer = ( {customerRef} ) => {

    const { customers, mySwiper, setMySwiper} = usePageLoadingContext();

    const customerSwiperRef               = useRef();
    const swiperNext                      = useRef();
    const swiperPrev                      = useRef();
    const swiperPagination                = useRef();
    
    const [showItem, setShowItem]           = useState(false);
    const initRef = useRef(true);

    useEffect(() =>{
        if(initRef.current){
            revealItem(customerRef);
        }
        return () => initRef.current = false;
    }, []);

    useEffect(() => {
        if(mySwiper){
            var swiper = new Swiper( customerSwiperRef.current, {         
                slidesPerView: 1,
                spaceBetween: 50,
                navigation: {
                    nextEl: swiperNext.current,
                    prevEl: swiperPrev.current,
                },
                pagination: {
                el: swiperPagination.current,
                clickable: true,
                },
                breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 33,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 33,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 33,
                },
                },
                keyboard: {
                    enabled: true,
                    onlyInViewport: false,
                    pageUpDown:true,
                  },
            });
        }
    }, [mySwiper])

    const revealItem = (referItem) => {     
        window.addEventListener( 'scroll', () => {
            if(!referItem.current){
                return;
            }else{
                let screenHeight = window.innerHeight;
                let scrollTop    = referItem.current.getBoundingClientRect().top;
                if(scrollTop < screenHeight/2 + 150){
                    setShowItem(true);
                }else{
                    setShowItem(false);
                }
            }    
        });
    }
  
    
  return (
    <div className="my_portfolio_section customer" ref={ customerRef }>
       <div className="container">
          <div className="my-portfolio-title-box">
              <h4 className='title'>My Customer Talking About</h4>
              <div className='title-line'></div>
          </div>
          <div className="content">
              {
                customers.length > 0?       
                <div className="swiper my_portfolio_swiper" ref={ customerSwiperRef }>
                    <div className="swiper-wrapper">
                        {
                            customers.map(( customer, index ) => 
                                <div className= "swiper-slide"  key={index}>
                                    
                                        <div tabIndex="0" className={`my-portfolio-customer-card my-portfolio-ovelay-box box-shadow ${showItem ? "show_up":""}`}> 
                                        
                                            <div className="my_portfolio_line"> 
                                           
                                                <div className="customer-image-box">                         
                                                    <div className='customer-image' style={ {backgroundImage:`url("${import.meta.env.VITE_API_BASE_URL}/images/customers/${customer.image}")`}}>
                                                    </div> 
                                                </div> 
                                             
                                                <h5 className='customer-name'>{customer.name}</h5>
                                                <h6 className="customer-job">{customer.job}</h6>
                                                <div className="my-portfolio-star">
                                                    <div className="start-item checked">
                                                        <i className="bi bi-star"></i>
                                                    </div>
                                                    <div className="start-item checked">
                                                        <i className="bi bi-star"></i>
                                                    </div>
                                                    <div className="start-item checked">
                                                        <i className="bi bi-star"></i>
                                                    </div>
                                                    <div className="start-item checked">
                                                        <i className="bi bi-star"></i>
                                                    </div>
                                                    <div className="start-item">
                                                        <i className="bi bi-star"></i>
                                                    </div>
                                                </div>
                                            </div>       
                                            <p className="customer-comment">{customer.comment}</p>                          
                                            <OverLay data_tooltip=""/>
                                       
                                        </div>
                                                      
                                </div> 
                            )              
                        }
                    </div>
                    <div className="swiper-button-next my-portfolio-swiper-button next" ref={swiperNext}></div>
                    <div className="swiper-button-prev my-portfolio-swiper-button prev" ref={swiperPrev}></div>
                    <div className="swiper-pagination my-portfolio-swiper-pagination" ref={swiperPagination}></div>
                </div>      
                :       
                <div className="row d-flex align-items-center">
                    <div className="col-12 p-5">
                        <div className="text-center">
                            <h5>There're no information On Customer Page</h5>
                        </div>
                    </div>
                </div>
              }
          </div>
      </div>
    </div> 
  )
}

export default Customer