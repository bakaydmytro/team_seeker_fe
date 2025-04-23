import "./ChooseGameMain.css";

import CSBtn from "../../../img/CS BTN.png";
import DotaBtn from "../../../img/DOTA BATON.png";
import { Link } from "react-router-dom";
import RustBtn from "../../../img/RUST BRN.png";
import TeamBtn from "../../../img/TEAM BTN.png";

export default function ChooseGame() {
  return (
    <section className="ChooseGame-section">
      <div className="container ChooseGame-container">
        <p>Choose your game</p>
        <div className="ChooseGame-block">
          <Link to="/Search?appid=570" className="Choose-btn">
            <img src={DotaBtn} alt="Dota"/>
          </Link>
          <Link to="/Search?appid=730" className="Choose-btn">
            <img src={CSBtn} alt="Cs"/>
          </Link>
          <Link to="/Search?appid=252490" className="Choose-btn">
            <img src={RustBtn} alt="Rust"/>
          </Link>
          <Link to="/Search?appid=440" className="Choose-btn">
            <img src={TeamBtn} alt="Teams"/>
          </Link>
        </div>
      </div>
    </section>
  );
}
