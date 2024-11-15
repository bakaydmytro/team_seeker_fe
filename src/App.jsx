import './App.css';
import Header from './components/MainPage/Header/Header'
import Main from './components/MainPage/Main/Main'
import Footer from './components/MainPage/Footer/Footer'


function App() {
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

export default App;
