
import {Routes , Route , Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';

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
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );
};

function AxiosInterceptors() {

  const navigate = useNavigate();

  useEffect(() => {
    setupAxiosInterceptors(navigate);
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/login')
    }

  }, []);
  return (
    <div >

    </div>
  );
}

export default AxiosInterceptors;
