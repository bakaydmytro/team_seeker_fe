import { Link } from "react-router-dom";
import './ChooseGameMain.css';
import DotaBrn from '../../../img/DOTA BATON.png';
import CSBrn from '../../../img/CS BTN.png';
import RustBrn from '../../../img/RUST BRN.png';
import TeamBrn from '../../../img/TEAM BTN.png';


export default function () {

    
    return (
        <section className="ChooseGame-section">
            <div className='container ChooseGame-container'>
                <p>Choose your game</p>
                <div className='ChooseGame-block'>
                    <Link to="/DotaPage" className="Choose-btn">
                        <img src={DotaBrn} />
                    </Link>
                    <Link to="/CSPage" className="Choose-btn">
                        <img src={CSBrn} />
                    </Link>
                    <Link to="/RustPage" className="Choose-btn">
                        <img src={RustBrn} />
                    </Link>
                    <Link to="/TeamPage" className="Choose-btn">
                        <img src={TeamBrn} />
                    </Link>
                </div>
            </div>

        </section>
    );
}