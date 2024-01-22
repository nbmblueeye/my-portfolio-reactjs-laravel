import React, { useEffect } from 'react'

const PortfolioModal = ( {title, modal_datas, display, _setModal} ) => {

  useEffect(() => {
    if(display){
      document.querySelector("#my-portfolio-html").style.overflowY = 'hidden';
    }else{
      document.querySelector("#my-portfolio-html").style.overflowY = 'scroll';
    }
    
  }, [display])

  return (
      <div className={`my-portfolio-modal-container ${display ? "active":""} my-portfolio-component`} onClick={(e) => _setModal(null, e)}>
        <div className="my-portfolio-modal-card">
          {    
            title && <div className="my_portfolio_line"><h5 className="modal-card-title">{ title }</h5></div>
          }
          <div className="modal-body">
            {
              modal_datas.map((modal_data, index) => 
                <div className="modal-body-wrapper" key={index}>
                  {modal_data.image && 
                    <div className="image-box">
                      <img src={`${import.meta.env.VITE_API_BASE_URL}/images/services/service-items/${modal_data.image}`} loading='lazy'alt='modal-image'/>
                    </div>
                  }
                  <div className="infomation-box">
                      { modal_data.title && <h5 className="modal_title">{ modal_data.title }</h5>}
                      {
                        modal_data.description && <p className="modal_description">{ modal_data.description }</p>
                      }
                  </div>
                </div>
              )
            }
          </div>
          <div className="my-portfolio-close-button" onClick={(e) => _setModal(null, e)}>
            <i className="bi bi-x-lg"></i>
          </div>
        </div>
      </div>
  )
}

export default PortfolioModal