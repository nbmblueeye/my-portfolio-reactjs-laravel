import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use(function(config){

    let token = localStorage.getItem('USER_TOKEN');
    config.headers.Authorization = `Bearer ${token}`

    return config;
});

axiosClient.interceptors.response.use(function(response){

    return response;

}, function(error){
    
    return Promise.reject(error);
});

export default axiosClient;