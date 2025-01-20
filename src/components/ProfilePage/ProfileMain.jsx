import './ProfilePage.css'
import { Button } from "antd";
import { Link } from 'react-router-dom'
import ProfileIcon from '../../img/icons/image 18.svg';
import CancelIcon from '../../img/icons/CancelIcon.svg';
import OkIcon from '../../img/icons/OkIcon.svg';
import RenameIcon from '../../img/icons/RenameIcon.svg';
import { ReactComponent as SteamIcon } from '../../img/icons/Vector.svg';


export default function ProfileMain() {
    return (
        <div className='container profile-container'>
            <h1>Edit profile</h1>
            <section className="profile-section">
                <aside className="left-side-profile-block">
                    <form className='image-form'>
                        <input type="image" src={ProfileIcon} alt="Profile Icon" className='profile-img' />
                        <span className='change-profile-img'>+</span>
                    </form>
                    <div className="rename">
                        <p className='profile-name'>Name</p>
                        <img src={RenameIcon} alt="Rename Icon" className='rename-btn' />
                    </div>
                </aside>
                <aside className="right-side-profile-block">

                    <div className="form-block">
                        <div className="form-head">
                            <h2>Change your Email</h2>
                            <div className="icons">
                                <img src={OkIcon} alt="Success Icon" className="success-icon" />
                                <img src={CancelIcon} alt="Cancel Icon" className="cancel-icon" />
                            </div>
                        </div>
                        <form className='change-profile-form'>
                            <h5>Enter your new email :</h5>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input"
                            />
                            <Button className='apply-button'>Apply</Button>
                        </form>
                    </div>

                    <div className="form-block">
                        <div className="form-head">
                            <h2>Change your password</h2>
                            <div className="form-info-icons">
                                <img src={OkIcon} alt="Success Icon" className="success-icon" />
                                <img src={CancelIcon} alt="Cancel Icon" className="cancel-icon" />
                            </div>
                        </div>
                        <form className='change-profile-form'>
                            <h5>enter your new password :</h5>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input"
                            />
                            <Button className='apply-button'>Apply</Button>
                        </form>
                    </div>
                    <div className="form-block">
                        <h2>Link your Steam account:</h2>
                        <Button className='steam-button' icon={<SteamIcon />}>Log in</Button>
                    </div>
                </aside>
            </section>
        </div>
    );
}
