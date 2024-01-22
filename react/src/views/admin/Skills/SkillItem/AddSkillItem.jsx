import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSkillItemContext } from '../../../../context/admin/Skill/SkillItemContext';

const AddSkillItem = () => {

  const { skills, addSkillItemErrors , addSkillItem, adding, refresh, setRefresh, } = useSkillItemContext();
 
  const [skillItem, setSkillItem] = useState({
    skill_id:"",
    title:"",
    description:"",
    percent:"",
  });

  const _setSkillItem = (e) => {
    setSkillItem({...skillItem, [e.target.name]: e.target.value});
  }

  useEffect(() => {
    if(refresh){
      setTimeout(() => {
        setSkillItem({
          skill_id:"",
          title:"",
          description:"",
          percent:"",
        })
      }, 2000)
    };
    return () => setRefresh(false);
  }, [refresh])

  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Add Skill Item Information</h5> 
        <Link to="/admin/skills/item/index">
          <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => addSkillItem(e, skillItem)}>
              <div className="row gap-3">
                  <div className="col-md-6 mb-3">
                    <label className="form-label" htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={skillItem.title} onChange={(e) => _setSkillItem(e)}/>
                    <div className="errors">
                      {
                        addSkillItemErrors.hasOwnProperty('title') && addSkillItemErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="skill_id">Skill</label>
                    <select className="form-select" id="skill_id" name="skill_id" value={skillItem.skill_id} onChange={(e) => _setSkillItem(e)}>
                      <option value=''>Choose a Skill...</option>
                      {
                        skills.length > 0 ?
                        skills.map((skill, index) => <option value={skill.id} key={index}>{skill.title}</option>)
                        :
                        <option>...</option>
                      }
                      
                    </select>
                    <div className="errors">
                      {
                        addSkillItemErrors.hasOwnProperty('skill_id') && addSkillItemErrors['skill_id'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                      <label className="form-label" htmlFor="description">Description</label>
                      <textarea rows="3" className="form-control" id="description" name="description" value={skillItem.description} onChange={(e) => _setSkillItem(e)}/>
                      <div className="errors">
                        {
                          addSkillItemErrors.hasOwnProperty('description') && addSkillItemErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label" htmlFor="percent">Percent</label>
                    <input type="text" className="form-control" id="percent" name="percent" value={skillItem.percent} onChange={(e) => _setSkillItem(e)}/>
                    <div className="errors">
                      {
                        addSkillItemErrors.hasOwnProperty('percent') && addSkillItemErrors['percent'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                      }
                    </div>
                  </div>
              </div>
              <div className="mt-5">
                  <button type="submit" disabled={adding ? true:false} className="btn btn-primary float-end">
                    {
                      adding ?
                      (
                        <div className="spinner-border text-success" role="status">
                          <span className="visually-hidden">Adding...</span>
                        </div>
                      )
                      :
                      <>Add SkillItem</>    
                    }
                  </button>
              </div>
          </form>
      </div>
    </> 
  )
}

export default AddSkillItem