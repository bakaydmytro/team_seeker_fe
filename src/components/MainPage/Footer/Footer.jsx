import "./Footer.css";

import FacebookIcon from "../../../img/icons/Facebook.png";
import InstagramIcon from "../../../img/icons/Instagram.png";
import LinkedInIcon from "../../../img/icons/LinkedIn.png";
import XIcon from "../../../img/icons/X.png";
import YoutubeIcon from "../../../img/icons/Youtube.png";

export default function Footer() {
  return (
    <footer>
      <section className="footer-container">
        <div className="first-footer-block">
          <a className="logo" href="/">
            Team Seeker
          </a>
          <div className="top-footer-block">
            <a className="footer-links">About Us</a>
            <a className="footer-links">Contact Support</a>
            <a className="footer-links">FAQ Section</a>
            <a className="footer-links">Blog Posts</a>
            <a className="footer-links">User Reviews</a>
          </div>
          <div className="icon-footer-section">
            <a href="" className="icon">
              <img src={FacebookIcon} alt="" />
            </a>
            <a href="" className="icon">
              <img src={InstagramIcon} alt="" />
            </a>
            <a href="" className="icon">
              <img src={LinkedInIcon} alt="" />
            </a>
            <a href="" className="icon">
              <img src={XIcon} alt="" />
            </a>
            <a href="" className="icon">
              <img src={YoutubeIcon} alt="" />
            </a>
          </div>
        </div>
        <div className="second-footer-block">
          <p>© 2024 Team Seeker. All rights reserved.</p>
          <a className="footer-links">Privacy Policy</a>
          <a className="footer-links">Terms of Service</a>
          <a className="footer-links"> Cookies Settings</a>
        </div>
      </section>
    </footer>
  );
}
