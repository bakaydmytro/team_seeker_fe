import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import {Routes , Route , Link} from 'react-router-dom'

import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance, { setupAxiosInterceptors } from '../../service/axiosService';
import { getUserData } from '../../service/apiService';
import React from 'react';

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    setupAxiosInterceptors(navigate); // Ініціалізація інтерцепторів

    getUserData()
      .then((response) => {
        console.log('API call successful', response);
      })
      .catch((error) => {
        console.error('API call failed', error);
      });
  }, [navigate]);
  return (
    <div>
      <div className="container">
      <Header/>
      <Main/>
      <Footer/>
      </div>
      
    </div>
  );
}

export default MainPage;