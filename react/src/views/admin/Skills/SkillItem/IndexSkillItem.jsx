import React, { useState , useEffect } from 'react'
import Loading from '../../../../components/Loading';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useSkillItemContext } from '../../../../context/admin/Skill/SkillItemContext';
import { useUserContext } from '../../../../context/front-end/UserContext';

const IndexSkillItem = () => {

    const userContext = useUserContext();   
    const { skillItems, loading, deleteSkillItem, deleting } = useSkillItemContext();

  let output = "";
  if(loading){
      output = <Loading/>            
  }else{
      output = skillItems.length > 0 ?
      <table className="table table-bordered text-center align-middle">
          <thead>
              <tr>
                    <th scope="col">#</th>
                    <th scope="col">title</th>
                    <th scope="col">description</th>
                    <th scope="col">Percent</th>
                    <th scope="col">Created_at</th>
                    {
                        userContext.user.role == "Admin" && <th scope="col">Action</th>
                    }
              </tr>
          </thead>
          <tbody>
              {
                  skillItems.map((skillItem, index) => 
                      { 
                          return (        
                          <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{skillItem.title}</td>
                              <td>{skillItem.description}</td>
                              <td>{skillItem.percent}</td>
                              <td>{skillItem.created_at}</td>
                              {
                                userContext.user.role == "Admin" &&
                                <td>
                                    <div className="my-portfolio-table-button">
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                            overlay={
                                                <Popover id="popover-update">
                                                    <Popover.Body>
                                                    Update SkillItem
                                                    </Popover.Body>
                                                </Popover>
                                            }>
                                            <Link className="button update" to={`/admin/skills/item/edit/${skillItem.id}`}><i className="bi bi-pencil"></i></Link>
                                        </OverlayTrigger>
                                        &nbsp;
                                        <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                            overlay={
                                                <Popover id="popover-delete">
                                                    <Popover.Body>
                                                    Delete SkillItem
                                                    </Popover.Body>
                                                </Popover>
                                            }>
                                            <button className="button delete" type='button' disabled={deleting == skillItem.id ? true:false} onClick={(e) => deleteSkillItem(e, skillItem.id)}>
                                            {
                                                deleting == skillItem.id ?
                                                (
                                                    <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
                                                )
                                                :
                                                <i className="bi bi-trash3"></i>   
                                            }
                                            </button>
                                        </OverlayTrigger>
                                        
                                    </div>
                                </td>
                              }
                          </tr>  
                          )
                      }
                  )
              }
          </tbody>
      </table>       
      : 
      <div className="d-flex align-items-center text-primary w-100 py-5">
          <strong>There are no Skill Item Information available</strong>
      </div>
  }

  return (
    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Skill-Item</h5> 
            {
                userContext.user.role == "Admin" ?
                <Link to="/admin/skills/item/add">
                    <button className='btn btn-primary float-end p-2'>Add Skill-Item Information</button>
                </Link>
                :
                <div></div>
            }   
        </div> 
        <div className="card-body">
            <div className="table-responsive">
            {
                output
            }
            </div>
        </div>
    </>
  )
}

export default IndexSkillItem