import React, { createContext, useContext, useState, useRef, useEffect, useReducer} from 'react';
import axiosClient from '../../../axiosClient';

    const initPortfolio = {
        data:[],
        addPortfolioErrors:{},
        updatePortfolioErrors:{},
    }

    const reducer = (state, action) => {
        switch (action.type) {

            case "Initial_Portfolios":
                return {
                ...state, data: action.payload
                };

            case "Add_Portfolio": 

                let error_keys = Object.keys(action.payload.errors); 
                if(error_keys.length > 0 )
                {
                    return {...state, addPortfolioErrors: action.payload.errors};
                }else{  
                    return {
                        ...state, ...{data: [...state.data, action.payload.data], addPortfolioErrors: {}}
                    };
                }

            case "Update_Portfolio": 
        
                let update_error_keys = Object.keys(action.payload.errors); 
                if( update_error_keys.length > 0 )
                {
                    return {...state, updatePortfolioErrors: action.payload.errors};
        
                }else if( !action.payload.data ){ 
        
                    return {...state, updatePortfolioErrors: {}};
        
                }else if( action.payload.data ){ 
        
                    return {
                        ...state, ...{data: state.data.map( item => item.id == action.payload.data.id ? {...item, ...action.payload.data}:item), updatePortfolioErrors: {}}
                    };
        
                }

            case "Delete_Portfolio": 

                return {
                    ...state, ...{ data: state.data.filter(item => item.id != action.payload ), addPortfolioErrors: {},  updatePortfolioErrors:{} }
                };

            default:
                return state;
        }
    }
    
    const createPortfolioContext = createContext( initPortfolio );
    
    export const usePortfolioContext = () => useContext( createPortfolioContext );

const PortfolioContext = ( {children} ) => {

    const [state, dispatch] = useReducer(reducer, initPortfolio);

    const [loading, setLoading]   = useState(false);
    const [refresh, setRefresh]   = useState(false);
    const [adding, setAdding]     = useState(false);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const portfolioInitRef = useRef(true);

    useEffect(() =>{
        if(portfolioInitRef.current){
            getPortfolios();
        }
        return () => {
          portfolioInitRef.current = false;
        }
    }, []);
    
    const getPortfolios = async() => {
      setLoading(true); 
      await axiosClient.get('/admin/portfolios')
      .then(res =>{
        if(res && res.status == 200){
          setLoading(false);
          let { data } = res.data;
          if(data){
            dispatch({ type:"Initial_Portfolios", payload: data });
          }
        }    
      })
      .catch(error => {
          setLoading(false);
          console.log(error);
      })
    }

    const addPortfolio = async(e, portfolio) => {
        e.preventDefault();
        setAdding(true);
       
        let portfolioForm = new FormData();
        portfolioForm.append('title', portfolio.title);
        portfolioForm.append('sub_title', portfolio.sub_title);
        portfolioForm.append('description', portfolio.description);
        portfolioForm.append('image', portfolio.image);

        await axiosClient.post('/admin/portfolios', portfolioForm)
        .then(res => {
          setAdding(false);
          if(res.status == 201){
            toast.fire({
              icon: 'success',
              title: res.data.message,
            })
            dispatch({type: "Add_Portfolio", payload: {data: res.data.data, errors:{}}});
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
              dispatch({type: "Add_Portfolio", payload: {data: null, errors: response.data.errors}});
            }
          }
        })
    }

    const getPortfolio = ( portfolio_id ) => {
        if(portfolio_id){
            let datas = state.data.filter(data => data.id == portfolio_id);
            if(datas.length > 0){
            return datas[0];
            }
        }
    }
    
    const updatePortfolio = async(e, portfolio_id, portfolio) => {
      e.preventDefault();
      setUpdating(true);
  
      let portfolioForm = new FormData();
      portfolioForm.append('title', portfolio.title);
      portfolioForm.append('sub_title', portfolio.sub_title);
      portfolioForm.append('description', portfolio.description);
      portfolioForm.append('image', portfolio.image);
      portfolioForm.append('_method', 'put');

      await axiosClient.post(`/admin/portfolios/${ portfolio_id }`, portfolioForm)
      .then(res => {
        setUpdating(false);
        if(res.status == 202){
          toast.fire({
              icon: 'success',
              title: res.data.message,
          });
          dispatch({type: "Update_Portfolio", payload: {data: res.data.data, errors:{}}});
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
            dispatch({type: "Update_Portfolio", payload: {data: null, errors: response.data.errors}});
          }else if(response.status == 404){
            toast.fire({
              icon: 'error',
              title: response.data.error,
            })
            dispatch({type: "Update_Portfolio", payload: {data: res.data.data, errors: {}}});
          }
          console.log(response);
        }
      })
    }
    
    const deletePortfolio = (e, portfolio_id) => {
        e.preventDefault();
        setDeleting( portfolio_id );
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
                axiosClient.delete(`/admin/portfolios/${ portfolio_id }`)
                .then(res =>{
                    if(res && res.status == 204){
                      dispatch({ type: "Delete_Portfolio", payload: portfolio_id });
                      toast.fire({
                        icon: 'warning',
                        title: 'Selected Service was deleted',
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
    <createPortfolioContext.Provider
        value={
            {
                portfolios: state.data, loading, deletePortfolio, deleting, 
                addPortfolioErrors:state.addPortfolioErrors , addPortfolio, adding, refresh, setRefresh,
                getPortfolio, updatePortfolio, updating, updatePortfolioErrors: state.updatePortfolioErrors
            }
        }
    >
        {children}
    </createPortfolioContext.Provider>
  )
}

export default PortfolioContext