import "./Buttons.css";
import { getUserData, updateUserDataField , steamRedirect } from "../../service/UserService";

export default function SteamConnect({ onClick }) {
  return (
    <div className="steam-connect-wrapper">
      <button onClick={() => steamRedirect()} className="steam-connect-btn">
        <span className="steam-text-normal">Sign in through</span>
        <span className="steam-text-bold">STEAM<p style={{fontSize:'8px'}}>®</p></span>
      </button>
      <span className="steam-disclaimer">
        This site not associated with Valve Corp.
      </span>
    </div>
  );
}
