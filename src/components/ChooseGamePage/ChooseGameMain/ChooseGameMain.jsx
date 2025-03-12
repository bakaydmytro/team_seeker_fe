import "./ChooseGameMain.css";

import CSBtn from "../../../img/CS BTN.png";
import DotaBtn from "../../../img/DOTA BATON.png";
import { Link } from "react-router-dom";
import RustBtn from "../../../img/RUST BRN.png";
import TeamBtn from "../../../img/TEAM BTN.png";

export default function () {
  return (
    <section className="ChooseGame-section">
      <div className="container ChooseGame-container">
        <p>Choose your game</p>
        <div className="ChooseGame-block">
          <Link to="/Search" className="Choose-btn">
            <img src={DotaBtn} />
          </Link>
          <Link to="/Search" className="Choose-btn">
            <img src={CSBtn} />
          </Link>
          <Link to="/Search" className="Choose-btn">
            <img src={RustBtn} />
          </Link>
          <Link to="/Search" className="Choose-btn">
            <img src={TeamBtn} />
          </Link>
        </div>
      </div>
    </section>
  );
}
