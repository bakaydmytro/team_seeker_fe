import './ProfilePage.css';
import CancelButton from '../Buttons/CancelButton';

export default function Header(){
    return(
        <header>
            <a className='logo' href="/">Team Seeker</a>
            <div className="button-block">
                <CancelButton/>
            </div>
        </header>
    )
}
