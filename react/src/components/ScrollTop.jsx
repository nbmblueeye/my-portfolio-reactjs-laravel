import React,{ useState, useEffect} from 'react';

const ScrollTop = ( {serviceRef } ) => {

    const [display, setDisplay] = useState(false);

    useEffect(() => {
        window.addEventListener( 'scroll', () => {
            if(!serviceRef.current){
                return;
            }else{
                let serviceTop    = serviceRef.current.offsetTop;
                if(window.scrollY > serviceTop){
                    setDisplay(true);
                }else{
                    setDisplay(false);
                } 
            }
        });
    }, [])

    const goToTop = (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    
  return (
    <div className={ `my-portfolio-scroll-to-top ${display ? "scroll-to-top":""}` } onClick={(e) => goToTop(e)}>
        <div className="my-portfolio-button">
        <i className="bi bi-chevron-up"></i>
        </div>
    </div>
  )
}

export default ScrollTop