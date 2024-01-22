import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import DisplayImage from '../../../components/admin/DisplayImage';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { usePortfolioContext } from '../../../context/admin/Portfolio/PortfolioContext';
import { useUserContext } from '../../../context/front-end/UserContext';

const IndexPortfolio = () => {

    const userContext = useUserContext(); 
    const { portfolios, loading, deletePortfolio, deleting, } = usePortfolioContext();

    let output = "";
    if(loading){
        output = <Loading/>            
    }else{
        output = portfolios.length > 0 ?
        <table className="table table-bordered text-center align-middle">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">title</th>
                    <th scope="col">sub_title</th>
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
                    portfolios.map((portfolio, index) => 
                        { 
                            return (        
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{portfolio.title}</td>
                                <td>{portfolio.sub_title}</td>
                                <td>{portfolio.description}</td>
                                <td className='text-center'><DisplayImage url={portfolio.image} files="portfolios"/></td>
                                <td>{portfolio.created_at}</td>
                                {
                                    userContext.user.role == "Admin" &&
                                    <td>
                                        <div className="my-portfolio-table-button">
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-update">
                                                        <Popover.Body>
                                                        Update Portfolio
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <Link className="button update" to={`/admin/portfolio/edit/${portfolio.id}`}><i className="bi bi-pencil"></i></Link>
                                            </OverlayTrigger>
                                            &nbsp;
                                            <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                                overlay={
                                                    <Popover id="popover-delete">
                                                        <Popover.Body>
                                                        Delete Portfolio
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <button className="button delete" type='button' disabled={deleting == portfolio.id ? true:false} onClick={(e) => deletePortfolio(e, portfolio.id)}>
                                                {
                                                    deleting == portfolio.id ?
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
            <strong>There are no Portfolios Page Information available</strong>
        </div>
    }  

  return (
    <>
        <div className="card-header d-flex justify-content-between">
            <h5 className="title">Portfolios</h5>
            {
                userContext.user.role == "Admin" ?
                <Link to="/admin/portfolio/add">
                    <button className='btn btn-primary float-end p-2'>Add Portfolio Information</button>
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

export default IndexPortfolio