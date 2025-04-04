import { Button } from "antd";
import { Link } from 'react-router-dom'
import BackIcon from '../../img/icons/back.svg'

export default function Header(){
    return(
        <header>
            <a className='logo' href="/">Team Seeker</a>
            <div className="button-block">
                <Link to='/ChooseGamePage'><Button className="learn-more-button back-button" ><img src={BackIcon}/> BACK</Button></Link>
            </div>
        </header>
    )
}