import React from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { initializeAxios } from './axiosService.js'; 

function AxiosInterceptors() {
  const navigate = useNavigate();
  const location = useLocation();

  initializeAxios(navigate);

  const token = localStorage.getItem('token');

  if (!token && location.pathname !== '/login' && location.pathname !== '/registration') {
    return <Navigate to="/login" replace />;

  }

  return null;
}

export default AxiosInterceptors;