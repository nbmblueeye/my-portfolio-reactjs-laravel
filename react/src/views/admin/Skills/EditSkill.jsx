import React, {  useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import Image from '../../../components/Image';
import { useSkillContext } from '../../../context/admin/Skill/SkillContext';

const EditSkill = () => {

  const { skill_id } = useParams();
  const { loading, getSkill, updateSkill, updating, updateSkillErrors } = useSkillContext();
  
  const [skill, setSkill]       = useState({
    title:"",
    description:"",
    image:""
  });

  const _setSkill = (e) => {
    setSkill({...skill, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let skill_ = getSkill(skill_id);
      if( skill_ ){
        setSkill({...skill,...{
            title: skill_.title,
            description: skill_.description,
            image: skill_.image
          }
        });
      }
    }
  }, [loading]);

  let output = "";
  if(loading){
    output = <Loading/>
  }else{ 
    output = 
    (
      <>
        <div className="row gap-3">
            <div className="col-md-6 mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" name="title" value={skill.title} onChange={(e) => _setSkill(e)}/>
              <div className="errors">
                {
                  updateSkillErrors.hasOwnProperty('title') && updateSkillErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                }
              </div>
            </div>
            <div className="col-md-12 mb-3">
                  <label className="form-label">Description</label>
                  <textarea rows="3" className="form-control" name="description" value={skill.description} onChange={(e) => _setSkill(e)}/>
                  <div className="errors">
                    {
                      updateSkillErrors.hasOwnProperty('description') && updateSkillErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
              </div>
              <div className="col-md-4 mb-3">
                  <label className="form-label">Skill Image</label>
                  <Image image={skill} setImage={setSkill} files="skills"/> 
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
                    <>Update Skill</>    
                }
            </button>
        </div>
      </>
    ) 
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Edit Skill</h5> 
        <Link to="/admin/skills/index">
          <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => updateSkill(e, skill_id, skill)}>
            { output }
        </form>
      </div>
    </> 
  )
}

export default EditSkill
