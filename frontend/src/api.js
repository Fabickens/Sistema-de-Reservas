import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Ajusta la URL base según tu backend
});

// Interceptor para agregar el token en el encabezado Authorization
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Aquí interpolamos el token correctamente
    }
    return config;
});

export default api;
