import axios from 'axios';

const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      const token = localStorage.getItem('token');
      if (!token || error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/registration');
      }
      return Promise.reject(error);
    }
  );
};

const initializeAxios = (navigate) => {
  setupAxiosInterceptors(navigate);
};

export { initializeAxios };