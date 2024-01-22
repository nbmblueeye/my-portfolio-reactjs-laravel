import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

    const initPortfolioButton = {
        data:[],
        portfolios:[],
        addPortfolioButtonErrors:{},
        updatePortfolioButtonErrors:{},
    }

    const reducer = (state, action) => {
      switch (action.type) {
        case "Initial_Portfolio_Buttons":
          return {
            ...state, ...{data:action.payload.data_, portfolios: action.payload.portfolios_}
          };
  
        case "Add_Portfolio_Button": 
          let error_keys = Object.keys(action.payload.errors); 

          if(error_keys.length > 0 )
          {

            return {...state, addPortfolioButtonErrors: action.payload.errors};

          }else if( !action.payload.data){ 

            return {...state, addPortfolioButtonErrors: {}};

          }else if( action.payload.data ){  

            return {
              ...state, ...{data: [...state.data, action.payload.data], addPortfolioButtonErrors: {}}
            };

          }
  
        case "Update_Portfolio_Button": 
  
          let update_error_keys = Object.keys(action.payload.errors); 

          if( update_error_keys.length > 0 )
          {
  
            return {...state, updatePortfolioButtonErrors: action.payload.errors};
  
          }else if( !action.payload.data ){ 
  
            return {...state, updatePortfolioButtonErrors: {}};
  
          }else if( action.payload.data ){ 
  
            return {
              ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updatePortfolioButtonErrors: {}}
            };
  
          }
  
        case "Delete_Portfolio_Button": 
          return {
            ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addPortfolioButtonErrors: {}, updatePortfolioButtonErrors:{} }
          };
  
        default:
            return state;
      }
    }
    
    const createPortfolioButtonContext = createContext( initPortfolioButton );
    
    export const usePortfolioButtonContext = () => useContext( createPortfolioButtonContext );

const PortfolioButtonContext = ( {children} ) => {

    const [state, dispatch] = useReducer( reducer, initPortfolioButton );

    const [loading, setLoading]    = useState(false);
    const [refresh, setRefresh]    = useState(false);
    const [adding, setAdding]      = useState(false);
    const [updating, setUpdating]  = useState(false);
    const [deleting, setDeleting]  = useState(null);
    const portfolioButtonInitRef   = useRef(true);

    useEffect(() =>{
        if(portfolioButtonInitRef.current){
          getPortfolioButtons();
        }
        return () => {
          portfolioButtonInitRef.current = false;
        }
    }, []);
    
    const getPortfolioButtons = async() => {
        setLoading(true); 
        await axiosClient.get('/admin/portfolio-buttons')
        .then(res =>{
          if(res && res.status == 200){
            setLoading(false);
            let { portfolios, data } = res.data; 
            dispatch({ type:"Initial_Portfolio_Buttons", payload: {data_:data, portfolios_:portfolios} });
          }    
        })
        .catch(error => {
            setLoading(false);
            console.log(error);
        })
    }

    const addPortfolioButton = async(e, portfolioButton) => {
      e.preventDefault();
      setAdding(true);

      let portfolioButtonForm = new FormData();
      portfolioButtonForm.append('portfolio_id', portfolioButton.portfolio_id);
      portfolioButtonForm.append('text', portfolioButton.text);
      portfolioButtonForm.append('link', portfolioButton.link);

      await axiosClient.post('/admin/portfolio-buttons', portfolioButtonForm)
      .then(res => {
        setAdding(false);
        if(res.status == 201){
          toast.fire({
            icon: 'success',
            title: res.data.message,
          })
          dispatch({type: "Add_Portfolio_Button", payload: {data: res.data.data, errors:{}}});
          setRefresh(true);
        } 
      })
      .catch(({response}) => { 
        setAdding(false);
        if(response){
          if(response.status == 422){
            toast.fire({
              icon: 'error',
              title: response.data.message,
            });
            dispatch({type: "Add_Portfolio_Button", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
            toast.fire({
              icon: 'error',
              title: response.data.error,
            });
            dispatch({type: "Add_Portfolio_Button", payload: {data: response.data.data, errors: {}}});
          }
        }
      })
    }
  
    const getPortfolioButton = ( portfolio_button_id ) => {
      if( portfolio_button_id ){
        let datas = state.data.filter(data => data.id ==portfolio_button_id );
        if(datas.length > 0){
          return datas[0];
        }
      }
    }
    
    const updatePortfolioButton = async( e, portfolio_button_id, portfolioButton ) => {
      e.preventDefault();
      setUpdating(true);

      let portfolioButtonForm = new FormData();
      portfolioButtonForm.append('portfolio_id', portfolioButton.portfolio_id);
      portfolioButtonForm.append('text', portfolioButton.text);
      portfolioButtonForm.append('link', portfolioButton.link);
      portfolioButtonForm.append('_method', 'put');

      await axiosClient.post(`/admin/portfolio-buttons/${ portfolio_button_id }`, portfolioButtonForm)
      .then(res => {
          setUpdating(false);
          if(res.status == 202){
          toast.fire({
              icon: 'success',
              title: res.data.message,
          });
          dispatch({type: "Update_Portfolio_Button", payload: {data: res.data.data, errors:{}}});
          }
      })
      .catch(({response}) => { 
          setUpdating(false);
          if(response){
          if(response.status == 422){
              toast.fire({
              icon: 'error',
              title: response.data.message,
              });
              dispatch({type: "Update_Portfolio_Button", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
              toast.fire({
              icon: 'error',
              title: response.data.error,
              })
              dispatch({type: "Update_Portfolio_Button", payload: {data: res.data.data, errors: {}}});
          }
          }
      })
    }
  
    const deletePortfolioButton = (e, portfolio_button_id) => {
      e.preventDefault();
      setDeleting(portfolio_button_id);
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
              e.preventDefault();
              axiosClient.delete(`/admin/portfolio-buttons/${ portfolio_button_id }`)
              .then(res =>{
                  if(res && res.status == 204){
                    dispatch({ type: "Delete_Portfolio_Button", payload: portfolio_button_id });
                    toast.fire({
                      icon: 'warning',
                      title: 'Selected Skill Item was deleted',
                    });
                    setDeleting(null);
                  }
              })
              .catch(error => {
                if(error){
                  setDeleting(null);
                  console.log(error);
                }
              })
          }else{
            setDeleting(null);
          }
      })    
    }

  return (
    <createPortfolioButtonContext.Provider
      value={
        {
          portfolioButtons: state.data, loading, deletePortfolioButton, deleting, 
          addPortfolioButtonErrors:state.addPortfolioButtonErrors , addPortfolioButton, adding, refresh, setRefresh,
          portfolios: state.portfolios, getPortfolioButton, updatePortfolioButton, updating, updatePortfolioButtonErrors: state.updatePortfolioButtonErrors
        }
      }
    >
      {children}
    </createPortfolioButtonContext.Provider>
  )
}

export default PortfolioButtonContext