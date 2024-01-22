import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useVisitorMessageContext } from '../../../../context/front-end/VisitorMessageContext';
import Pagination from '../../../../components/Pagination';

const IndexVisitorMessage = () => {

    const { messages_, data, loading, getVisitorMessages, markAsReadMessage, updating, deleting, deleteMessage} = useVisitorMessageContext();

    let output = "";
    if(loading){
      output = <Loading/>            
    }else{
      output = messages_.length > 0 ?
          (
            <table className="table table-bordered text-center align-middle my_portfolio_component">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Title</th>
                    <th scope="col">Message</th>
                    <th scope="col">Created_at</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    messages_.map((message, index) => {
                      return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{ typeof message.data === 'object' ? message.data.user_name : JSON.parse(message.data)['user_name']}</td>
                            <td>{ typeof message.data === 'object' ? message.data.messageTitle : JSON.parse(message.data)['messageTitle']}</td>
                            <td>{ typeof message.data === 'object' ? message.data.message : JSON.parse(message.data)['message']}</td>
                            <td>{message.created_at}</td>
                            <td>
                               
                              <div className="my-portfolio-table-button">
                                <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                    overlay={
                                          <Popover id="popover-update">
                                            <Popover.Body>
                                                Mark as Read
                                            </Popover.Body>
                                          </Popover>
                                    }>
                                     <button className={`button update ${message.notifiable}`}  type='button' disabled={updating == message.id || message.read_at ? true:false} onClick={(e) => markAsReadMessage( e, message.notifiable_id ,message.id )}>
                                      {
                                        updating == message.id ?
                                        (
                                          <span className="spinner-border spinner-border-sm text-primary" aria-hidden="true"></span>
                                        )
                                        :
                                        
                                          !message.read_at ?
                                          <i className="bi bi-envelope-exclamation"></i>
                                          :
                                          <i className="bi bi-envelope-check"></i>
                                        
                                      }
                                    </button>
                                </OverlayTrigger>
                                 &nbsp;   
                                <OverlayTrigger trigger={['hover', 'focus']} placement="top" 
                                    overlay={
                                      <Popover id="popover-delete">
                                        <Popover.Body>
                                            Delete message
                                        </Popover.Body>
                                      </Popover>
                                    }>
                                    <button className="button delete" type='button' disabled={deleting == message.id ? true:false} onClick={(e) => deleteMessage( e, message.notifiable_id ,message.id )}>
                                      {
                                        deleting == message.id ?
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
                          </tr>
                      )
                    })
                  }
                </tbody>
            </table>      
          )
          :
          (
            <div className="d-flex align-items-center text-primary w-100 py-5">
                <strong>There are no User available</strong>
            </div>
          )
    }

  return (
    <>
       <div className="card-header d-flex justify-content-between">
          <h5 className="title">Visitor Message</h5> 
           <div></div>
      </div> 
      <div className="card-body">
          <div className="table-responsive">
            {
              output
            }
            {
              data.total > data.per_page &&
              <div className="d-flex justify-content-end mt-5 me-5">
                  <Pagination items={data}  onPaginate={getVisitorMessages}/> 
              </div>
            }
          </div>
      </div>
    </>
  )
}

export default IndexVisitorMessage
