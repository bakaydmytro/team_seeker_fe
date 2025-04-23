
import Login from './components/Login/Login.js';
import Registration from './components/Registration/Registration';
import MainPage from './components/MainPage/MainPage';
import Search from './components/Search/Search.js';
import Chat from './components/Chat/Chat.js';
import FriendsPage from './components/ProfilePage/FriendsPage/FriendsPageMain.jsx';

import UserPage from  "./components/ProfilePage/UserPage.jsx"
import EditProfile from  "./components/ProfilePage/EditProfile.jsx"

import ChooseGamePage from './components/ChooseGamePage/ChooseGamePage.js';
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import {Routes , Route} from 'react-router-dom';

import React from 'react';
import './App.css';


function App() {
  


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/ChooseGamePage' element={<ChooseGamePage/>}/>
          {/* <Route path='/ProfilePage' element={<ProfilePage/>}/>
          <Route path='/UserPage'  element={<UserPage/>}/>
          <Route path='/EditProfile' element={<EditProfile/>}/> */}
          <Route path="/ProfilePage/*" element={<ProfilePage />}>
            <Route index element={<UserPage />} /> {/* <-- це дефолт */}
            <Route path="edit" element={<EditProfile />} />
            <Route path='friends' element={<FriendsPage/>}/>
          </Route>

        
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Search' element={<Search/>}/>
        <Route path='/Chat' element={<Chat/>}/>
        <Route path='/FriendsPage' element={<FriendsPage/>}/>
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