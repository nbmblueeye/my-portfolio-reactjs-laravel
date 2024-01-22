import React from 'react';

const OverLay = ({ data_tooltip, id, _setModal }) => {
  return (
    <div>
        <div className="my-portfolio-ovelay" onClick={(e) => id ? _setModal(id, e):{}}>
          {
            data_tooltip &&
            <div className='eye'>
                <i className="bi bi-eye-fill fs-3"></i>
                <div className="my-portfolio-tooltip">
                    { data_tooltip }
                </div>
            </div>
          }     
        </div>
    </div>
  )
}

export default OverLay