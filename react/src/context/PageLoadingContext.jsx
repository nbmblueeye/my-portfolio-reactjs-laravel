import React, {useState, createContext, useContext, useEffect, useRef } from 'react';
import axiosClient from '../axiosClient';

const createPageLoadingContext = createContext();

export const usePageLoadingContext = () => {
   return useContext( createPageLoadingContext )
};

const PageLoadingContext = ( { children }) => {
  const [pageLoading, setPageLoading] = useState(false);

  const [portfolios, setPortfolios]   = useState([]);
  const [mySwiper, setMySwiper]       = useState(false);
  const [services, setServices]       = useState([]);
  const [home, setHome]               = useState({});
  const [about, setAbout]             = useState({});
  const [skills, setSkills]           = useState([]);
  const [journeys, setJourneys]       = useState([]);
  const [parallax, setParallax]       = useState({});
  const [contact, setContact]         = useState({});
  const [customers, setCustomers]     = useState([]);
 
  const [refresh, setRefresh] = useState(false);

  useEffect(() =>{
   
      getFrontPages();
    
    return () => setRefresh(false);
  }, [refresh]);

  const getFrontPages = async() => {  
    setPageLoading(true);
    await axiosClient.get('/index')
    .then(res =>{
      if(res && res.status == 200){
        let { portfolios_, services_, homes_ , abouts_, skills_, qualifications_, parallax_, contact_, customers_ } = res.data;
        portfolios_ && setPortfolios( portfolios_ );  
        setTimeout(() => {
          setPageLoading(false); 
          setMySwiper(true);
          services_ && setServices(services_);
          homes_ && setHome(homes_);
          abouts_ && setAbout(abouts_);
          skills_ && setSkills(skills_);
          qualifications_ && setJourneys( qualifications_ );
          parallax_ && setParallax(parallax_);
          contact_ && setContact(contact_);
          customers_ && setCustomers(customers_)
        }, 1000);
      }
    })
    .catch(error => {
      setPageLoading(false);
      console.log(error);
    })
  }


    let data = {
      pageLoading,
      setRefresh,
      portfolios,
      mySwiper,
      setMySwiper,
      services,
      home,
      about,
      skills,
      journeys,
      parallax,
      contact,
      customers,
    }

  return (
    <createPageLoadingContext.Provider value={data}>
        { children }
    </createPageLoadingContext.Provider>
  )
}

export default PageLoadingContext