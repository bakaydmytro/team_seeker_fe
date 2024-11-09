import "./Main.css";
import RegisterButton from "../Buttons/RegisterButton";
import LearnMoreButton from "../Buttons/LearnMoreButton";

export default function Main() {
  return (
    <main>
      <div>
        <span>Find Your Perfect Teammate Today!</span>
        <p>
          Join Team Seeker to connect with like-minded individuals who share
          your passion. Start building your dream team effortlessly!
        </p>
        <RegisterButton />
        <LearnMoreButton />
      </div>
      <div>
        <img src="./img/img 1.png" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
    </main>
  );
}
