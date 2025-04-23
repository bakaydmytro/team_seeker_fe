import "./Buttons.css";

import { Link } from "react-router-dom";

export default function RegisterButton() {
  return (
    <Link className="Link" to="registration">
      <button className="register-button">Sing Up</button>
    </Link>
  );
}
