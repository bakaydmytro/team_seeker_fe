import './App.css';
import Login from './components/Loginn/Login.js'
import Registration from './components/Registration/Registration'
import MainPage from './components/MainPage/MainPage';
import {Routes , Route , Link} from 'react-router-dom'
import TokenValid from './components/Loginn/TokenValid.js';



function App() {

  
  return (
    <div className="App">
      <TokenValid/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
