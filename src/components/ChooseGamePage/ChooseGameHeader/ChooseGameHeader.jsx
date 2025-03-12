import { Button } from "antd";
import MoreInfoButton from "../../Buttons/MoreInfoButton";
import ProfileImg from "../../../img/icons/image 18.svg";

export default function Header() {
  return (
    <header>
      <a className="logo" href="/">
        Team Seeker
      </a>
      <div className="button-block">
        <Button className="Profile-btn" type="link" style={{ all: "unset" }}>
          <img src={ProfileImg} alt="" />
        </Button>
        <MoreInfoButton />
      </div>
    </header>
  );
}
