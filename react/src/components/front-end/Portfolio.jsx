import React, { useEffect, useRef } from 'react'
import Swiper from 'swiper/bundle';
import { usePageLoadingContext } from '../../context/PageLoadingContext';

const Portfolio = ( { portfolioRef } ) => {
    
    const { portfolios, mySwiper, setMySwiper } = usePageLoadingContext();
    let myPortfolioSwiperRef      = useRef(null);
    let myPortfolioNextRef        = useRef(null);
    let myPortfolioPrevRef        = useRef(null);
    let myPortfolioPaginationRef  = useRef(null);

    useEffect(() =>{    
      if(mySwiper){
        const swiper = new Swiper(myPortfolioSwiperRef.current, {
          speed: 4000,
          loop: true,
          spaceBetween: 30,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: myPortfolioNextRef.current,
            prevEl: myPortfolioPrevRef.current,
          },
        });
      }
      return () => setMySwiper(false);
    }, [mySwiper]);

    
  return (
    <div className={`my-portfolio-swiper-wrapper`} ref={ portfolioRef }>
      {
        portfolios.length > 0 ?
        <div className={`swiper my_portfolio_swiper`} ref={myPortfolioSwiperRef}>
              <div className={`swiper-wrapper`}>
                {
                  portfolios.map((portfolio, index) => 
                    <div className={`swiper-slide my-portfolio-swiper-slide`} key={index}>
                        <div className="my-portfolio-slider-box">
                          <div className="container-lg">                      
                            <div className="information">                            
                                <h4 className='title'>{portfolio.title}</h4>
                                <h5 className='sub_title'>{portfolio.sub_title}</h5>
                                <div dangerouslySetInnerHTML={{ __html: portfolio.description }} className='description'></div>
                                <a href={portfolio.portfolio_button?.link && portfolio.portfolio_button?.link} target="_blank">
                                  <div className="my-portfolio-button">
                                      {portfolio.portfolio_button?.text && portfolio.portfolio_button?.text}
                                      <span><i className="bi bi-chevron-right"></i></span>
                                  </div>
                                </a> 
                            </div>
                          </div>
                        </div>
                        <img src={`${import.meta.env.VITE_API_BASE_URL}/images/portfolios/${portfolio.image}`} alt="header_slider_image" />              
                    </div>
                  )
                }            
              </div>
              <div className="swiper-button-next my-portfolio-swiper-button" ref={myPortfolioNextRef}></div>
              <div className="swiper-button-prev my-portfolio-swiper-button" ref={myPortfolioPrevRef}></div>
              <div className="swiper-pagination" ref={myPortfolioPaginationRef}></div>
        </div>
        : 
        <div className="my_portfolio_section my-portfolio-no-slider-box">
            <h5>No Slider Available</h5>
        </div>
      }
    </div>
  )
}

export default Portfolio