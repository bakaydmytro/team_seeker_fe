import './App.css';
import Login from './components/Loginn/Login.js'
import Registration from './components/Registration/Registration'
import MainPage from './components/MainPage/MainPage';

import ChooseGamePage from './components/ChooseGamePage/ChooseGamePage.js';
import ProfilePage from './components/ProfilePage/ProfilePage.js';
import {Routes , Route , Link} from 'react-router-dom'

import {Routes , Route , Link,useNavigate} from 'react-router-dom'
import AxiosInterceptors from './service/AxiosInterceptors.js';



function App() {


  return (
    <div className="App">
      <AxiosInterceptors/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/ChooseGamePage' element={<ChooseGamePage/>}/>
        <Route path='/ProfilePage' element={<ProfilePage/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
