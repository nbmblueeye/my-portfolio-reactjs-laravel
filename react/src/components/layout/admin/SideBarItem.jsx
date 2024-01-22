import React, {useRef} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SideBarItem = ({ name, activeItems, setActiveItem, sideBarRef }) => {
    
    
    const navigated = useNavigate();
    const location = useLocation();
   
    const _setDisplayItem = (e, input) => {
        e.preventDefault();
        if(!input.items.length > 0){
            navigated(input.link);
        }
        setActiveItem(activeItems.map((activeItem, index) => activeItem.name == name ? {...activeItem,status: !activeItem.status}:{...activeItem,status: false}));
    }

    const toSpecifyPage = (url) => {
        navigated(url);
    } 

   
  return (
    <div className="sidebar-box">
        {
            activeItems.map((activeItem,index) => {
                return activeItem.name == name &&
                    <div key={index} className={`sidebar-item-box ${activeItem.status ? "active":""}`}>
                        <div className={`sidebar-item ${activeItem.status ? "active":""}`} onClick={(e) =>_setDisplayItem(e, activeItem)}>
                            <div className="tag"><span className='fs-5 me-3'><i className={ activeItem.icon }></i></span> { activeItem.name }</div>
                            <span className={`item-signal fs-6 ${activeItem.status ? "show":""}`}> <i className={ activeItem.signal }></i> </span>
                        </div>
                        <div className={`sub-sidebar-item ${activeItem.status ? "active":""}`} style={{height: `${activeItem.status ? sideBarRef.current[index].scrollHeight + "px" : 0 + "px"}`}} ref={(e) => sideBarRef.current[index] = e}>
                            {
                                activeItem.items.length > 0 && activeItem.items.map((data, index) => (<div className={`item ${activeItem.status && location.pathname == data.link ? "active":""}`} key={index} onClick={() => toSpecifyPage(data.link)}>{data.name}</div>))
                            }
                        </div>
                    </div>
            })
        }
    </div>
  )
}

export default SideBarItem