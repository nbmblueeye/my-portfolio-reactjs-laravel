import React, { useEffect } from 'react'
import { useSkillContext } from '../../context/admin/Skill/SkillContext';
import { useServiceContext } from '../../context/admin/Service/ServiceContext';
import { useQualificationContext } from '../../context/admin/Qualification/QualificationContext';
import { useCustomerCommentContext } from '../../context/admin/CustomerComment/CustomerCommentContext';


const DashBoard = () => {

   const { skills } = useSkillContext();
   const { services } = useServiceContext();
   const { qualifications } = useQualificationContext();
   const { comments } = useCustomerCommentContext();
   
  return (
    <div className="card shadow my_portfolio_section p-4">
        <h3 className="title mb-5">Dashboard</h3>     
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-5 mb-5">
          <div className={`col`}>
              <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                  <div className="card-body">
                      <h5 className='card-title'>Total User</h5>
                      <p className='card-text'>6</p>
                  </div>                       
              </div>              
          </div> 
          <div className={`col`}>
              <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                  <div className="card-body">
                      <h5 className='card-title'>User as Admin</h5>
                      <p className='card-text'>1</p>
                  </div>                       
              </div>              
          </div>   
          <div className={`col`}>
              <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                  <div className="card-body">
                      <h5 className='card-title'>User as Visitor</h5>
                      <p className='card-text'>5</p>
                  </div>                       
              </div>              
          </div>    
          <div className={`col`}>
              <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                  <div className="card-body">
                      <h5 className='card-title'>Message</h5>
                      <p className='card-text'>60</p>
                  </div>                       
              </div>              
          </div>       
        </div>  
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-5  mb-5">
          <div className={`col`}>
              <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                <div className="card-body">
                    <h5 className='card-title'>Total Post</h5>
                    <p className='card-text'>8</p>
                </div>                       
              </div>                
          </div>  
          <div className={`col`}>
              <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                <div className="card-body">
                    <h5 className='card-title'>Post Views</h5>
                    <p className='card-text'>500 views</p>
                </div>                       
              </div>                
          </div>  
          <div className={`col`}>
            <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                <div className="card-body">
                    <h5 className='card-title'>Post Comment</h5>
                    <p className='card-text'>200 comments</p>
                </div>                       
            </div>                
          </div>  
          <div className={`col`}>
            <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                <div className="card-body">
                    <h5 className='card-title'>Like Post</h5>
                    <p className='card-text'>300 likes</p>
                </div>                       
            </div>                
          </div>           
        </div> 
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-5">
          <div className={`col`}>
              <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                <div className="card-body">
                    <h5 className='card-title'>Total Skills</h5>
                    <p className='card-text'>
                        {
                            skills?.length
                        }
                    </p>
                </div>                       
              </div>                
          </div>  
          <div className={`col`}>
              <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                <div className="card-body">
                    <h5 className='card-title'>Total Services</h5>
                    <p className='card-text'>
                        {
                            services?.length
                        }
                    </p>
                </div>                       
              </div>                
          </div>  
          <div className={`col`}>
            <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                <div className="card-body">
                    <h5 className='card-title'>Total Qualifications</h5>
                    <p className='card-text'>
                        {
                            qualifications?.length
                        }
                    </p>
                </div>                       
            </div>                
          </div>  
          <div className={`col`}>
            <div className={`my-portfolio-card my-portfolio-ovelay-box box-shadow`}>                                 
                <div className="card-body">
                    <h5 className='card-title'>Total Customer Comments</h5>
                    <p className='card-text'>
                        {
                           comments?.total
                        }
                    </p>
                </div>                       
            </div>                
          </div>           
        </div> 
    </div>
  )
}

export default DashBoard