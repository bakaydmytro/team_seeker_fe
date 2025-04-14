import "./Header.css";

import LogInButton from "../../Buttons/LogInButton";
import RegisterButton from "../../Buttons/RegisterButton";

export default function Header() {
  return (
    <header>
      <span className="logo">
        Team Seeker
      </span>
      <div className="button-block">
        <RegisterButton />
        <LogInButton />
      </div>
    </header>
  );
}
