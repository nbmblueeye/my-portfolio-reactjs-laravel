import React, { useEffect, useState } from 'react';
import Loading from '../../../components/Loading';
import axiosClient from '../../../axiosClient';
import { Link } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import DisplayImage from '../../../components/admin/DisplayImage';
import { useSkillContext } from '../../../context/admin/Skill/SkillContext';
import { useUserContext } from '../../../context/front-end/UserContext';

const IndexSkill = () => {

    const userContext = useUserContext();  
    const { skills, loading, deleteSkill, deleting } = useSkillContext();

  let output = "";
  if(loading){
      output = <Loading/>            
  }else{
      output = skills.length > 0 ?
        <table className="table table-bordered text-center align-middle">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">title</th>
                    <th scope="col">description</th>
                    <th scope="col">Image</th>
                    <th scope="col">Created_at</th>
                    {
                        userContext.user.role == "Admin" && <th scope="col">Action</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    skills.map((skill, index) => 
                        { 
                            return (        
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{skill.title}</td>
                                <td>{skill.description}</td>
                                <td className='text-center'><DisplayImage url={skill.image} files="skills"/></td>
                                <td>{skill.created_at}</td>
                                {
                                    userContext.user.role == "Admin" &&
                                    <td>
                                        <div className="my-portfolio-table-button">
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-update">
                                                        <Popover.Body>
                                                        Update Skill
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <Link className="button update" to={`/admin/skills/edit/${skill.id}`}><i className="bi bi-pencil"></i></Link>
                                            </OverlayTrigger>
                                            &nbsp;
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-delete">
                                                        <Popover.Body>
                                                        Delete Skill
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <button className="button delete" type='button' disabled={deleting == skill.id ? true:false} onClick={(e) => deleteSkill(e, skill.id)}>
                                                {
                                                    deleting == skill.id ?
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
            <strong>There are no Skills Page Information available</strong>
        </div>
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Skill</h5> 
        {
            userContext.user.role == "Admin" ?
            <Link to="/admin/skills/add">
                <button className='btn btn-primary float-end p-2'>Add Skill Information</button>
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

export default IndexSkill