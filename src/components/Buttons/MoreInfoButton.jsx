import "./Buttons.css";

import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import ProfileIcon from "../../img/icons/image 18.svg";
import SteamIcon from "../../img/icons/Vector.svg";
import { getUserData } from "../../service/UserService";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logOut = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    getUserData().then((response) => setUsername(response.data.username));
  }, []);

  return (
    <div>
      <div className="burger" onClick={toggleMenu}>
        <div className={`burger-line ${isOpen ? "open" : ""}`}></div>
        <div className={`burger-line ${isOpen ? "open" : ""}`}></div>
        <div className={`burger-line ${isOpen ? "open" : ""}`}></div>
      </div>
      <div className={`menu-container ${isOpen ? "open" : ""}`}>
        <div className="profile-icon">
          <img src={ProfileIcon} alt="Profile" />
          <p className="user-name">{username}</p>
        </div>
        <Link to="/ProfilePage" className="menu-item">
          Edit profile
        </Link>
        <Link to="/link-steam" className="menu-item link-steam">
          <img src={SteamIcon} alt="Steam" />
          Link Steam
        </Link>
        <Link onClick={(e) => logOut(e)} to="/" className="menu-item">
          Log out
        </Link>
      </div>
    </div>
  );
}
