import './App.css';
import Login from '/Users/max/Desktop/project/src/Components/Loginn/Login.js'
import Regist from '/Users/max/Desktop/project/src/Components/Regist/Regist.js'
import {Routes , Route , Link} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Regist/>}/>
        <Route path='/12' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
