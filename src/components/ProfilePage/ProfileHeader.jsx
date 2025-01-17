import './ProfilePage.css';
import { Button } from "antd";
import { Link } from 'react-router-dom'

export default function Header(){
    return(
        <header>
            <a className='logo' href="/">Team Seeker</a>
            <div className="button-block">
                <Link to='/ChooseGamePage'><Button className="learn-more-button" >X Cancel</Button></Link>
            </div>
        </header>
    )
}
