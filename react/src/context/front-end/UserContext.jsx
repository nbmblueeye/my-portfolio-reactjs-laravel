import React, { createContext, useContext, useState } from 'react';
import axiosClient from '../../axiosClient';
import { Navigate} from 'react-router-dom';

const createUserContext = createContext({
    token:null,
    _setToken:()=>{},
    user:{},
    _setUser:()=>{},
    Logout:()=>{},
});

export const useUserContext = () => {
    return useContext(createUserContext);
};

const UserContext = ( { children } ) => {

    const [token, setToken] = useState(localStorage.getItem('USER_TOKEN'));
    const [user, setUser]   = useState({
        name: localStorage.getItem('USER_NAME'),
        role: localStorage.getItem('USER_ROLE'),
        avatar: localStorage.getItem('USER_AVATAR')
    });
   
    const _setToken = (token) => {
        setToken(token)
        if(token){
            localStorage.setItem('USER_TOKEN', token);
        }else{
            localStorage.removeItem('USER_TOKEN')
        }
    }

    const _setUser = (data) => {
        if(data){
            localStorage.setItem('USER_NAME', data.name);
            localStorage.setItem('USER_ROLE', data.user_role);
            if(data.profiles){
                if(data.profiles.avatar){
                    localStorage.setItem('USER_AVATAR', data.profiles.avatar);
                    setUser({...user, ...{name: data.name, role: data.user_role, avatar: data.profiles.avatar}});
                }else{
                    setUser({...user, ...{name: data.name, role: data.user_role, avatar: null}});
                }
            }else{
                setUser({...user, ...{name: data.name, role: data.user_role, avatar: null}});
            }
            
        }else{
            setUser({...user, ...{name: null, role: null, avatar: null}});
            localStorage.removeItem('USER_NAME');
            localStorage.removeItem('USER_ROLE');
            localStorage.removeItem('USER_AVATAR');
        }
    }

    const Logout = async() => {
        await axiosClient.get('/logout')
        .then(res => {
            if(res.status == 204){
                _setToken(null);
                _setUser(null);
                
                setTimeout(() => {
                    <Navigate to="/"/>
                }, 2000);
            }
        })
        .catch((error) => { 
            console.log(error);
        })
    }

    let data = {
        token,
        _setToken,
        user,
        _setUser,
        Logout,
    }
    
    return (
        <createUserContext.Provider value={data}>
            {children}
        </createUserContext.Provider>
    )
}

export default UserContext