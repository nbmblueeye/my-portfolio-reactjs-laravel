import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettingContext } from '../context/SettingContext';

const MyPorfolioHelmet = ( { title } ) => {

    const { settings } = useSettingContext();
   
    let page_title = useMemo(() => {
        if(title){
            return title.name;
        }else{
            return settings.pageTitle;
        }
    },[title]);

  return (
    <>
        <Helmet prioritizeSeoTags>
            <title>{`${ page_title ? page_title: settings?.pageTitle}`}</title>
            <meta name="keywords" content={settings?.metaKeywords}/>
            <meta name="description" content={settings?.metaDes}></meta>
            <meta name="author" content="nbmblueeye"></meta>
        </Helmet>
    </>
  )
}

export default MyPorfolioHelmet
