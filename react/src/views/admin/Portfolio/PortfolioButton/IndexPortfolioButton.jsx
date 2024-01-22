import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { usePortfolioButtonContext } from '../../../../context/admin/Portfolio/PortfolioButtonContext';
import { useUserContext } from '../../../../context/front-end/UserContext';

const IndexPortfolioButton = () => {

    const userContext = useUserContext(); 
    const { portfolioButtons, loading, deletePortfolioButton, deleting, } = usePortfolioButtonContext();
    
    let output = "";
    if(loading){
        output = <Loading/>            
    }else{
        output = portfolioButtons.length > 0 ?
        <table className="table table-bordered text-center align-middle">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Portfolio Button Text</th>
                    <th scope="col">Portfolio Button Link</th>
                    <th scope="col">Created_at</th>
                    {
                        userContext.user.role == "Admin" && <th scope="col">Action</th>
                    }
                </tr>
            </thead>
            <tbody>
                {
                    portfolioButtons.map((portfolioButton, index) => 
                        { 
                            return (        
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{portfolioButton.text}</td>
                                <td>{portfolioButton.link}</td>
                                <td>{portfolioButton.created_at}</td>
                                {
                                    userContext.user.role == "Admin" &&
                                    <td>
                                        <div className="my-portfolio-table-button">
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-update">
                                                        <Popover.Body>
                                                        Update Portfolio Button
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <Link className="button update" to={`/admin/portfolio/button/edit/${portfolioButton.id}`}><i className="bi bi-pencil"></i></Link>
                                            </OverlayTrigger>
                                            &nbsp;
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-delete">
                                                        <Popover.Body>
                                                        Delete Portfolio Button
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <button className="button delete" type='button' disabled={deleting == portfolioButton.id ? true:false} onClick={(e) => deletePortfolioButton(e, portfolioButton.id)}>
                                                {
                                                    deleting == portfolioButton.id ?
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
            <strong>There are no Portfolio Buttons Page Information available</strong>
        </div>
    }  
  
  return (

    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Portfolio Buttons</h5>
            {
                userContext.user.role == "Admin" ?
                <Link to="/admin/portfolio/button/add">
                    <button className='btn btn-primary float-end p-2'>Add Portfolio Button Information</button>
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

export default IndexPortfolioButton