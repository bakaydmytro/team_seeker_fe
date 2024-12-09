import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Buttons.css';
import ProfileIcon from "../../img/icons/image 18.svg";
import SteamIcon from "../../img/icons/Vector.svg";


export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className="burger" onClick={toggleMenu}>
                <div className={`burger-line ${isOpen ? 'open' : ''}`}></div>
                <div className={`burger-line ${isOpen ? 'open' : ''}`}></div>
                <div className={`burger-line ${isOpen ? 'open' : ''}`}></div>
            </div>
            <div className={`menu-container ${isOpen ? 'open' : ''}`}>
                <div className="profile-icon">
                    <img src={ProfileIcon} alt="Profile" />
                    <p className="user-name">User name</p></div>
                <Link to="/edit-profile" className="menu-item">
                    Edit profile
                </Link>
                <Link to="/link-steam" className="menu-item link-steam">
                    <img src={SteamIcon} alt="Steam" />
                    Link Steam
                </Link>
                <Link to="/logout" className="menu-item">
                    Log out
                </Link>
            </div>
        </div>
    );
}
