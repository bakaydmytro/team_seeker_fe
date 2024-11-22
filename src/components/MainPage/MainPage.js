import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import {Routes , Route , Link} from 'react-router-dom'


function MainPage() {
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