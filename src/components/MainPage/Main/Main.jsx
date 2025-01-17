import "./Main.css";
import { Button } from "antd";
import {Link} from 'react-router-dom'
import RegisterButton from "../../Buttons/RegisterButton";
import ScrollPhotos from "../Items/ScrollPhotos";
import QueteBlock from "../Items/QuoteBlock";
import QuoteLogo from "../../../img/icons/gamepad-solid.svg"

export default function Main() {
  return (
    <main>
      <section className="scroll-section">
        <div className="first-main-block block">
          <h1 className="scroll-section-print" > Find Your Perfect Teammate Today!</h1>
          <p className="p">
            Join Team Seeker to connect with like-minded individuals who share
            your passion. Start building your dream team effortlessly!
          </p>
          <div className="button-block">
            <RegisterButton />
            <Link to='ChooseGamePage'><Button className="learn-more-button " >Learn More</Button></Link>
          </div>
        </div>
        <div className="second-main-block">
          <ScrollPhotos />
        </div>
      </section>
      <section className="main-info">
        <div className="first-main-info-block first-qoute-block">
        <img src={QuoteLogo} className="qoute-icon"alt="" />
    
          <span className="quote-section-print">Medium length section heading goes here</span>
          <p className="p qoute-p">
            At Team Seeker, we connect you with the ideal teammates to elevate
            your projects. Our user-friendly platform simplifies the search
            process, making collaboration seamless and efficient.
          </p>
          <RegisterButton/>
        </div>
        <div className="second-main-info-block block">
          <QueteBlock />
        </div>
      </section>
    </main>

    
  );
}

