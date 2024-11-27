import "./Main.css";
import RegisterButton from "../../Buttons/RegisterButton";
import LearnMoreButton from "../../Buttons/LearnMoreButton";
import ScrollPhotos from "../Items/ScrollPhotos";
import CubeIcon from "../../../img/Relume.png";
import QueteBlock from "../Items/QuoteBlock"

export default function Main() {
  return (
    <main>
      <section className="scroll-section">
        <div className="first-main-block block">
          <span className="span" > Find Your Perfect Teammate Today!</span>
          <p className="p">
            Join Team Seeker to connect with like-minded individuals who share
            your passion. Start building your dream team effortlessly!
          </p>
          <div className="button-block">
            <RegisterButton />
            <LearnMoreButton />
          </div>
        </div>
        <div className="second-main-block block">
          <ScrollPhotos />
        </div>
      </section>
      <section className="main-info">
        <div className="first-main-info-block block">
          <a>
            <img src={CubeIcon} alt="" />
          </a>
          <span className="span">Medium length section heading goes here</span>
          <p className="p">
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
