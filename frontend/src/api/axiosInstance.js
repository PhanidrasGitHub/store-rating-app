import axios from 'axios';
//import { useAuth } from './AuthContext';

const axiosInstance = axios.create({
  baseURL: 'https://store-rating-app-backend-8x4p.onrender.com/api/auth',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
