// services/axiosService.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api/users',
});

// Додаємо інтерцептори
export const setupAxiosInterceptors = (navigate) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      console.log('Intercepting request:', config);
      if (token) {
        console.log('Token added to headers:', token);
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('Request error:', error.message);
      navigate('/');
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('Response error:', error.response?.status, error.message);
      if (error.response?.status === 401) {
        navigate('/');
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
