import './Header.css';
import LogInButton from '../Buttons/LogInButton'
import RegisterButton from '../Buttons/RegisterButton'

export default function Header(){
    return(
        <header>
            <a className='logo' href="#">Team Seeker</a>
            <div className="button-block">
                <RegisterButton/>
                <LogInButton/>
            </div>
        </header>
    )
}
