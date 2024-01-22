import React, { useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import { useSkillItemContext } from '../../../../context/admin/Skill/SkillItemContext';


const EditSkillItem = () => {

  const { loading, skills, getSkillItem, updateSkillItem, updating, updateSkillItemErrors } = useSkillItemContext();

  let { skillItem_id } = useParams();
 
  const [skillItem, setSkillItem] = useState({
    skill_id:"",
    title:"",
    description:"",
    percent:"",
  });

  const _setSkillItem = (e) => {
    setSkillItem({...skillItem, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let skillItem_ = getSkillItem(skillItem_id);
      if( skillItem_ ){
        setSkillItem({...skillItem,...{
          skill_id:skillItem_.skill_id,
          title: skillItem_.title,
          description: skillItem_.description,
          percent: skillItem_.percent
          }
        });
      }
    }
  }, [loading]);

  let output = "";
  if(loading){
    output = <Loading/>
  }else{ 
    output = (
        <>
          <div className="row gap-3">
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" name="title" value={skillItem.title} onChange={(e) => _setSkillItem(e)}/>
                <div className="errors">
                  {
                      updateSkillItemErrors.hasOwnProperty('title') && updateSkillItemErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
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
                      updateSkillItemErrors.hasOwnProperty('skill_id') && updateSkillItemErrors['skill_id'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                  }
                </div>
              </div>
              <div className="col-md-6 mb-3">
                  <label className="form-label" htmlFor="description">Description</label>
                  <textarea rows="3" className="form-control" id="description" name="description" value={skillItem.description} onChange={(e) => _setSkillItem(e)}/>
                  <div className="errors">
                    {
                        updateSkillItemErrors.hasOwnProperty('description') && updateSkillItemErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label" htmlFor="percent">Percent</label>
                <input type="text" className="form-control" id="percent" name="percent" value={skillItem.percent} onChange={(e) => _setSkillItem(e)}/>
                <div className="errors">
                  {
                      updateSkillItemErrors.hasOwnProperty('percent') && updateSkillItemErrors['percent'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                  }
                </div>
              </div>
          </div>
          <div className="mt-5">
              <button type="submit" disabled={updating ? true:false} className="btn btn-primary float-end">
                  {
                      updating ?
                      (
                          <div className="spinner-border text-success" role="status">
                              <span className="visually-hidden">Updating...</span>
                          </div>
                      )
                      :
                      <>Update SkillItem</>    
                  }
              </button>
          </div>
        </>
    ) 
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between">
          <h5 className="title">Edit Skill Item Information</h5> 
          <Link to="/admin/skills/item/index">
            <button className='btn btn-primary float-end p-2'>Back</button>
          </Link>
      </div>
      <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => updateSkillItem(e, skillItem_id, skillItem)}>
              { output }
          </form>
      </div>
    </>
  )
}

export default EditSkillItem
