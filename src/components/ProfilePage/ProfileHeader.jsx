import "./ProfilePage.css";

import { Button } from "antd";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <span className="logo">
        Team Seeker
      </span>
      <div className="button-block">
        <Link to="/ChooseGamePage">
          <Button className="learn-more-button">X Cancel</Button>
        </Link>
      </div>
    </header>
  );
}
