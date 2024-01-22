import React from 'react';
import { usePageLoadingContext } from '../../context/PageLoadingContext';
import { useEffect } from 'react';

const Parallax = () => {

    const { parallax } = usePageLoadingContext();

    return (  
      <>
        { 
          Object.keys(parallax).length > 0 ?
            <div className='my_portfolio_section parallax' style={{backgroundImage:`url("${import.meta.env.VITE_API_BASE_URL}/images/parallaxs/${parallax.image}")`}}>
              <div className="container">     
                <div className={`information`}>
                <h3 className='title'>{parallax.title}</h3>
                <div className='sub_title'>{parallax.sub_title}</div>
                  <p className='description' dangerouslySetInnerHTML={{ __html: parallax.description }}></p>
                </div>      
              </div>
            </div>
          : 
          <div className="row d-flex align-items-center">
            <div className="col-12">
              <div className="text-center">
                <h5>There're no information On Parallax Page</h5>
              </div>
            </div>
          </div>
        }
      </>
    )
}

export default Parallax