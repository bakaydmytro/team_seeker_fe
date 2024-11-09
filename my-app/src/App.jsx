import './App.css';
import Login from'./components/Login/Login'
import Header from './components/MainPage/Header/Header'
import Main from './components/MainPage/Main/Main'


function App() {
  return (
    <div>
      <div className="container">
      <Header/>
      <Main/>
      </div>
      
    </div>
  );
}

export default App;
