import React, { useState, useEffect} from 'react';
import Loading from '../../../../components/Loading';
import { useParams, Link } from 'react-router-dom';
import Image from '../../../../components/Image';
import { useQualificationItemContext } from '../../../../context/admin/Qualification/QualificationItemContext';

const EditQualificationItem = () => {

  let { qualification_item_id } = useParams();

  const {loading, qualifications, getQualificationItem, updateQualificationItem, updating, updateQualificationItemErrors } = useQualificationItemContext();

  const [qualification_item, setQualification_Item]     = useState({
    qualification_id:"",
    title:"",
    description:"",
    image: ""
  });

  const _setQualification_Item = (e) => {
    setQualification_Item({...qualification_item, [e.target.name]: e.target.value});
  }

  useEffect(() =>{
    if(!loading){
      let qualificationItem_ = getQualificationItem( qualification_item_id );
      if( qualificationItem_ ){
        setQualification_Item({...qualification_item,...{
            qualification_id: qualificationItem_.qualification_id,
            title: qualificationItem_.title,
            description: qualificationItem_.description,
            image: qualificationItem_.image
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
            <input type="text" className="form-control" id="title" name="title" value={qualification_item.title} onChange={(e) => _setQualification_Item(e)}/>
            <div className="errors">
              {
                  updateQualificationItemErrors.hasOwnProperty('title') && updateQualificationItemErrors['title'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
              }
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label className="form-label" htmlFor="qualification_id">About</label>
            <select className="form-select" id="qualification_id" name="qualification_id" value={qualification_item.qualification_id} onChange={(e) => _setQualification_Item(e)}>
              <option value=''>Choose a Qualification...</option>
              {
                qualifications.length > 0 ?
                qualifications.map((qualification, index) => <option value={qualification.id} key={index}>{qualification.title}</option>)
                :
                <option>...</option>
              }
            </select>
            <div className="errors">
              {
                updateQualificationItemErrors.hasOwnProperty('qualification_id') && updateQualificationItemErrors['qualification_id'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
              }
            </div>
          </div>
          <div className="col-md-12 mb-3">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea rows="3" className="form-control" id="description" name="description" value={qualification_item.description} onChange={(e) => _setQualification_Item(e)}/>
                <div className="errors">
                  {
                      updateQualificationItemErrors.hasOwnProperty('description') && updateQualificationItemErrors['description'].map((error, index) => (<p className='text-danger fst-italic' key={index}>{error}</p>))
                  }
                </div>
          </div>
          <div className="col-md-4 mb-3">
              <label className="form-label" htmlFor='image'>Qualification Item Image</label>
              <Image image={ qualification_item } setImage={ setQualification_Item } files="qualifications/qualification-items"/> 
          </div>
        </div>
        <div className="mt-5">
            <button type="submit" disabled={updating ? true:false} className="btn btn-primary float-end">
                {
                    updating ?
                    (
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">upDating...</span>
                        </div>
                    )
                    :
                    <>Update Qualification_Item</>    
                }
            </button>
        </div>
      </>
    ) 
  }

  return (
    <>
      <div className="card-header d-flex justify-content-between">
        <h5 className="title">Edit Qualification-Item</h5> 
        <Link to="/admin/qualification/item/index">
          <button className='btn btn-primary float-end p-2'>Back</button>
        </Link>
      </div>
      <div className="card-body ">
          <form autoComplete='off' onSubmit={(e) => updateQualificationItem( e, qualification_item_id, qualification_item )}>
            {
              output
            }
          </form>
      </div>
    </> 
  )
}

export default EditQualificationItem