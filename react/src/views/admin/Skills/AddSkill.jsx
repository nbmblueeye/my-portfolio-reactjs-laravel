import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/Image';
import { useSkillContext } from '../../../context/admin/Skill/SkillContext';

const AddSkill = () => {

    const { addSkillErrors , addSkill, adding, refresh, setRefresh, } = useSkillContext();

    const [skill, setSkill]     = useState({
        title:"",
        description:"",
        image:""
    });
    const _setSkill = (e) => {
      setSkill({...skill, [e.target.name]: e.target.value});
    }

    useEffect(() => {
      if(refresh){
        setTimeout(() => {
          setSkill({
            title:"",
            description:"",
            image:""
          })
        }, 2000)
      };
      return () => setRefresh(false);
    }, [refresh])

  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Add New Skill</h5> 
        <Link to="/admin/skills/index">
          <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
        <form autoComplete='off' onSubmit={(e) => addSkill(e, skill)}>
            <div className="row gap-3">
                <div className="col-md-6 mb-3">
                  <label className="form-label"htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="title" name="title" value={skill.title} onChange={(e) => _setSkill(e)}/>
                  <div className="errors">
                    {
                      addSkillErrors.hasOwnProperty('title') && addSkillErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                    }
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                      <label className="form-label" htmlFor="description">Description</label>
                      <textarea rows="3" className="form-control" id="description" name="description" value={skill.description} onChange={(e) => _setSkill(e)}/>
                      <div className="errors">
                        {
                          addSkillErrors.hasOwnProperty('description') && addSkillErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                        }
                      </div>
                  </div>
                  <div className="col-md-4 mb-3">
                      <label className="form-label" htmlFor='image'>Skill Image</label>
                      <Image image={skill} setImage={setSkill} files="skills"/> 
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
                        <>Add New Skill</>    
                    }
                </button>
            </div>
        </form>
      </div>
    </> 
  )
}

export default AddSkill