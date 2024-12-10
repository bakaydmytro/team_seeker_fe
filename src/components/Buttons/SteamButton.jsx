import './Buttons.css';
import SteamIcon from '../../img/icons/Vector.svg';

export default function SteamButton(){
    return(
        <button className="steam-button">
        <img
            src={SteamIcon}
            alt="Steam Logo"
            className="steam-logo"
        />
        Log in
    </button>
    );
}