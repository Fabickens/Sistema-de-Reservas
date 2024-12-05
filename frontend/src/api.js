import axios from 'axios';
import { config } from 'dotenv';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', 
});

//Interceptar solicitudes para agregar el token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = 'Bearer ${token}';
    }
    return config;
});


export default api;
