import { useNavigate } from 'react-router-dom';
import {  useEffect } from 'react';



function TokenValid() {

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
        console.log('Користувач авторизований');
        navigate('/');
    }
}, [navigate]);
const isTokenValid = (token) => {
  try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000); 
      return payload.exp > now;
  } catch (e) {
      return false;
  }
};

  return (
    <div >

    </div>
  );
}

export default TokenValid;
