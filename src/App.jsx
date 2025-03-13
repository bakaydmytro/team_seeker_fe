import './App.css';
import Login from './components/Loginn/Login.js';
import Registration from './components/Registration/Registration';
import MainPage from './components/MainPage/MainPage';
import Search from './components/Search/Search.js';
import Chat from './components/Chat/Chat.js'

import ChooseGamePage from './components/ChooseGamePage/ChooseGamePage.js';
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import {Routes , Route , Link} from 'react-router-dom';

import React from 'react';

function App() {
  


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/ChooseGamePage' element={<ChooseGamePage/>}/>
        <Route path='/ProfilePage' element={<ProfilePage/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Search' element={<Search/>}/>
        <Route path='/Chat' element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;










//   const axiosInstance = axios.create({
//     baseURL: 'http://localhost:5001/api/users/me',
// });

// const navigate = useNavigate()
// const location = useLocation()
// React.useEffect ( ()=>{
//   axiosInstance.interceptors.request.use(
//     function (config) {
//         const token = localStorage.getItem('token');
//         console.log('Intercepting request:', config); // Додано лог
//         if (token) {
//             console.log('Token added to headers:', token); // Лог для токена
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     function (error) {
//         console.error('Request error:', error.message); // Лог помилки
//         navigate('/login');
//         return Promise.reject(error);
//     }
//   );

//   axiosInstance.interceptors.response.use(
//     function (response) {
//       // Якщо відповідь успішна, просто повертаємо її
//       return response;
//     },
//     function (error) {
//       // Обробка помилок відповіді
//       console.error('Response error:', error.response?.status, error.message);
//       if (error.response?.status === 401) {
//         navigate('/login'); // Перенаправлення на сторінку логіну
//         localStorage.removeItem('token')
//       }
//       return Promise.reject(error);
//     }
//   );

//   axiosInstance.get('')
//   .then(response => {
//     console.log('API call successful', response);
//   })
//   .catch(error => {
//     console.error('API call failed', error);
//   });
  
// },[navigate])