import React,{useState, useEffect} from 'react';
import { useSettingContext } from '../../../context/SettingContext';
import Loading from '../../../components/Loading';
import { useUserContext } from '../../../context/front-end/UserContext';
import Image from '../../../components/Image';

const Setting = () => {

    const userContext = useUserContext(); 

    const { settings, errors, saving, loading, addSetting } = useSettingContext();
   
    const [settings_, setSettings] = useState({
        image:"",
        websiteName:"",
        websiteUrl:"",
        websiteDescription:"",
        pageTitle:"",
        metaKeywords:"",
        metaDes:"",
        address:"",
        phoneNo1:"",
        phoneNo2:"",
        emailNo1:"",
        emailNo2:"",
        facebook:"",
        linkedin:"",
        instagram:"",
        youtube:"",
    });

    const _setSetting = (e) => {
        setSettings({...settings_,[e.target.name]: e.target.value}); 
    }

    useEffect(() =>{
       if(!loading){
            if( settings ){
                setSettings({...settings_,...settings});
            }
       }
    }, [loading]);

    let output = "";
    if(loading){
        output = <Loading/>            
    }else{
        output = 
        <>
            <div className="mb-5">
                    <div className="my_portfolio_header">
                        <h5>Website</h5>
                    </div>
                    <div className="body">
                        <div className="row g-3">
                            <div className="col-md-12">
                                <label className="form-label" htmlFor='image'>Image Logo</label>
                                <Image image={settings_} setImage={setSettings} files="settings"/> 
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor='websiteName'>Website Name</label>
                                <input type="text" className="form-control" id='websiteName' name="websiteName" value={settings_.websiteName} onChange={(e) => _setSetting(e)}/>
                                {errors.hasOwnProperty('websiteName') && errors.websiteName.map((err,index) => (<small className="text-danger fst-italic fw-lighter" key={index}>{err}</small>))}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor='websiteUrl'>Website Url</label>
                                <input type="text" className="form-control" id='websiteUrl' name="websiteUrl" value={settings_.websiteUrl} onChange={(e) => _setSetting(e)}/>
                                {errors.hasOwnProperty('websiteUrl') && errors.websiteUrl.map((err,index) => (<small className="text-danger fst-italic fw-lighter" key={index}>{err}</small>))}
                            </div>
                            <div className="col-12">
                                <label className="form-label" htmlFor='websiteDescription'>Website Description</label>
                                <textarea className="form-control" rows="3" id='websiteDescription' name="websiteDescription" value={settings_.websiteDescription} onChange={(e) => _setSetting(e)}></textarea>
                            </div>
                            <div className="col-12">
                                <label className="form-label" htmlFor='pageTitle'>Page Title</label>
                                <input type="text" className="form-control" id='pageTitle' name="pageTitle" value={settings_.pageTitle} onChange={(e) => _setSetting(e)}/>
                                {errors.hasOwnProperty('pageTitle') && errors.pageTitle.map((err,index) => (<small className="text-danger fst-italic fw-lighter" key={index}>{err}</small>))}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor='metaKeywords'>Meta Keywords</label>
                                <input type="text" className="form-control" id='metaKeywords' name="metaKeywords" value={settings_.metaKeywords} onChange={(e) => _setSetting(e)}/>
                                {errors.hasOwnProperty('metaKeywords') && errors.metaKeywords.map((err,index) => (<small className="text-danger fst-italic fw-lighter" key={index}>{err}</small>))}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label" htmlFor='metaDes'>Meta Description</label>
                                <input type="text" className="form-control" id='metaDes' name="metaDes" value={settings_.metaDes} onChange={(e) => _setSetting(e)}/>
                                {errors.hasOwnProperty('metaDes') && errors.metaDes.map((err,index) => (<small className="text-danger fst-italic fw-lighter" key={index}>{err}</small>))}
                            </div>
                        </div>
                    </div>
            </div>
            <div className="mb-5">
                <div className="my_portfolio_header">
                    <h5>Website Information</h5>
                </div>
                <div className="body">
                    <div className="row g-3">
                        <div className="col-12">
                            <label className="form-label" htmlFor='address'>Address</label>
                            <textarea className="form-control" rows="3" id='address' name="address" value={settings_.address} onChange={(e) => _setSetting(e)}></textarea>
                            {errors.hasOwnProperty('address') && errors.address.map((err,index) => (<small className="text-danger fst-italic fw-lighter" key={index}>{err}</small>))}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor='phoneNo1'>Phone No.1</label>
                            <input type="text" className="form-control" id='phoneNo1' name="phoneNo1" value={settings_.phoneNo1} onChange={(e) => _setSetting(e)}/>
                            {errors.hasOwnProperty('phoneNo1') && errors.phoneNo1.map((err,index) => (<small className="text-danger fst-italic fw-lighter" key={index}>{err}</small>))}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor='phoneNo2'>Phone No.2</label>
                            <input type="text" className="form-control" id='phoneNo2' name="phoneNo2" value={settings_.phoneNo2} onChange={(e) => _setSetting(e)}/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor='emailNo1'>Email No.1</label>
                            <input type="text" className="form-control" id='emailNo1' name="emailNo1" value={settings_.emailNo1} onChange={(e) => _setSetting(e)}/>
                            {errors.hasOwnProperty('emailNo1') && errors.emailNo1.map((err,index) => (<small className="text-danger fst-italic fw-lighter" key={index}>{err}</small>))}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor='emailNo2'>Email No.2</label>
                            <input type="text" className="form-control" id='emailNo2' name="emailNo2" value={settings_.emailNo2} onChange={(e) =>_setSetting(e)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <div className="my_portfolio_header">
                    <h5>Website Social Media</h5>
                </div>
                <div className="body">
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label" htmlFor='facebook'>FaceBook</label>
                            <input type="text" className="form-control" id='facebook' name="facebook" value={settings_.facebook} onChange={(e) => _setSetting(e)}/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor='linkedin'>LinkedIn</label>
                            <input type="text" className="form-control" id='linkedin' name="linkedin" value={settings_.linkedin} onChange={(e) => _setSetting(e)}/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor='instagram'>Instagram</label>
                            <input type="text" className="form-control" id='instagram' name="instagram" value={settings_.instagram} onChange={(e) => _setSetting(e)}/>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label" htmlFor='youtube'>Youtube</label>
                            <input type="text" className="form-control" id='youtube' name="youtube" value={settings_.youtube} onChange={(e) => _setSetting(e)}/>
                        </div>
                    </div>
                </div>
            </div>
            {
                userContext.user.role == "Admin" &&
                <div className="row">
                    <div className="col-12 mb-3">
                        {
                            Object.keys(settings_).length > 0 ?

                            (
                                saving ?    
                                <button className="btn btn-primary float-end" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Updating...
                                </button>
                                :
                                <button type="submit" className="btn btn-primary float-end">Update Setting</button>   
                            )
                            :
                            (
                                saving ?
                                <button className="btn btn-primary float-end" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Saving...
                                </button>
                                :
                                <button type="submit" className="btn btn-primary float-end">Save Setting</button>  
                            )
                        }
                        
                    </div>
                </div>
            }
        </>
    }
   
                        
    return (
        <div className="card shadow my_portfolio_section mb-3 ">
            <div className="card-header d-flex justify-content-between">
                <h5 className="title">Setting My Portfolio Website</h5> 
                <div></div>
            </div> 
            <div className="card-body pb-0">
                <form onSubmit={(e) => addSetting(e, settings_)}>
                    {output}
                </form>
            </div>
        </div>
    )
}

export default Setting