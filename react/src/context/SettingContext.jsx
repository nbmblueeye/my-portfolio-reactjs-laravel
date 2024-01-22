import React, { createContext, useContext, useState, useEffect, useRef, useReducer } from 'react';
import axiosClient from '../axiosClient';

    const initSetting = {
        settings:{},
        errors:{},
    }
  const reducer = (state, action) => {
      switch (action.type) {
        case "Initial_Settings":
          return {
            ...state, settings: action.payload.settings_
          };
        case "Add_Settings": 
          if(Object.keys(action.payload.errors_).length > 0 )
          {
            return {...state, errors: action.payload.errors_};
          }else{  
            return {
              ...state, ...{settings: {...state.settings, ...action.payload.settings_}, errors:{...state.errors, ...action.payload.errors_}}
            };
          }
        default:
            return state;
      }
  }
    
const createSettingContext = createContext(initSetting);

export const useSettingContext = () => useContext(createSettingContext);

const SettingContext = ( { children } ) => {

    const [state, dispatch] = useReducer(reducer, initSetting);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const initRef = useRef(true);


    useEffect(() => {
        if(initRef.current){
            getSetting();
        }
        return () => initRef.current = false;    
    }, [])

    const getSetting = async() => {
        setLoading(true);
        await axiosClient.get('/admin/settings')
        .then(res => {
            setLoading(false);
            if(res && res.status == 200){  
                let { settings_ } = res.data;
                if(settings_){
                    dispatch({ type:"Initial_Settings", payload: {settings_:{
                        image: settings_.logo ? settings_.logo:"",
                        websiteName:settings_.websiteName,
                        websiteUrl:settings_.websiteUrl,
                        websiteDescription:settings_.websiteDescription,
                        pageTitle:settings_.pageTitle,
                        metaKeywords:settings_.metaKeywords,
                        metaDes:settings_.metaDes,
                        address:settings_.address,
                        phoneNo1:settings_.phoneNo1,
                        phoneNo2:settings_.phoneNo2 ? settings_.phoneNo2:"",
                        emailNo1:settings_.emailNo1,
                        emailNo2:settings_.emailNo2 ? settings_.emailNo2:"",
                        facebook:settings_.facebook ? settings_.facebook:"",
                        linkedin:settings_.linkedin ? settings_.linkedin:"",
                        instagram:settings_.instagram ? settings_.instagram:"",
                        youtube:settings_.youtube ? settings_.youtube:"",
                      }
                    }
                  });
                }
            } 
        })
        .catch(err => {
            setLoading(false);
            if(err){
              console.log(err);
            }
        });
    }

    const addSetting = async(e, settings) => {
        e.preventDefault();
        setSaving(true);
        let settingForm = new FormData();
        settingForm.append('logo', settings.image);
        settingForm.append('websiteName', settings.websiteName);
        settingForm.append('websiteUrl', settings.websiteUrl);
        settingForm.append('websiteDescription', settings.websiteDescription);
        settingForm.append('metaKeywords', settings.metaKeywords);
        settingForm.append('pageTitle', settings.pageTitle);
        settingForm.append('metaDes', settings.metaDes);
        settingForm.append('address', settings.address);
        settingForm.append('phoneNo1', settings.phoneNo1);
        settingForm.append('phoneNo2', settings.phoneNo2);
        settingForm.append('emailNo1', settings.emailNo1);
        settingForm.append('emailNo2', settings.emailNo2);
        settingForm.append('facebook', settings.facebook);
        settingForm.append('linkedin', settings.linkedin);
        settingForm.append('instagram', settings.instagram);
        settingForm.append('youtube', settings.youtube);
        await axiosClient.post('/admin/settings/add', settingForm)
        .then(res => {
            if(res.status == 201){
                setSaving(false);
                let { settings_ } = res.data;
                if(settings_){
                    toast.fire({
                        icon: 'success',
                        text: res.data.message,
                    });
                    dispatch({ type:"Add_Settings", payload: {settings_:{
                        image: settings_.logo ? settings_.logo:"",
                        websiteName:settings_.websiteName,
                        websiteUrl:settings_.websiteUrl,
                        websiteDescription:settings_.websiteDescription,
                        pageTitle:settings_.pageTitle,
                        metaKeywords:settings_.metaKeywords,
                        metaDes:settings_.metaDes,
                        address:settings_.address,
                        phoneNo1:settings_.phoneNo1,
                        phoneNo2:settings_.phoneNo2 ? settings_.phoneNo2:"",
                        emailNo1:settings_.emailNo1,
                        emailNo2:settings_.emailNo2 ? settings_.emailNo2:"",
                        facebook:settings_.facebook ? settings_.facebook:"",
                        linkedin:settings_.linkedin ? settings_.linkedin:"",
                        instagram:settings_.instagram ? settings_.instagram:"",
                        youtube:settings_.youtube ? settings_.youtube:"",
                    },errors_:{} }
                });
                }
            }
        })
        .catch(err => {
            let { response } = err;
            if(response && response.status == 422){
              setSaving(false); 
              toast.fire({
                icon: 'error',
                title: response.data.message,
              });
              dispatch({type: "Add_Settings", payload: {settings_: null, errors_: response.data.errors}});
            }
            console.log(err);
        });
    }  

  return (
    <createSettingContext.Provider value={{settings:state.settings, errors:state.errors, loading, saving, addSetting }}>
        {children}
    </createSettingContext.Provider>
  )
}

export default SettingContext
