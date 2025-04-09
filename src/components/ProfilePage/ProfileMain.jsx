import "./ProfilePage.css";

import React, { useEffect, useState } from "react";
import { getUserData, updateUserDataField , steamRedirect } from "../../service/UserService";

import { Button } from "antd";
import CancelIcon from "../../img/icons/CancelIcon.svg";
import OkIcon from "../../img/icons/OkIcon.svg";
import ProfileIcon from "../../img/icons/image 18.svg";
import RenameIcon from "../../img/icons/RenameIcon.svg";
import { ReactComponent as SteamIcon } from "../../img/icons/Vector.svg";
import { useNavigate } from "react-router-dom";
import UploadPhoto from "../Buttons/UploadPhoto"

export default function ProfileMain() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [id, setID] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [usernameValid, setUsernameValid] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, [navigate]);

  const handleChange = async (e, field, value, setValue, setEmailError) => {
    e.preventDefault();
    try {
      const userDataResponse = await getUserData();
      setID(userDataResponse.id)
      const userId = userDataResponse.id;
      console.log(id)
      const updateResponse = await updateUserDataField(field, value, id)

      if (updateResponse) setValue("");

      console.log(`API call successful for ${field}`, updateResponse);
      setEmailError("");
    } catch (error) {
      if (error.response?.status === 400) {
        setEmailError("Email already in use");
      }
      console.error(`API call failed for ${field}`, error);
    }
  };

  const changePassword = (e) => {
    if (!passwordError && password)
      handleChange(e, "password", password, setPassword);
  };
  const changeEmail = (e) => {
    if (!emailError && email) handleChange(e, "email", email, setEmail);
  };
  const changeUserName = (e) => {
    if (!usernameError && username) 
      handleChange(e, "username", username, setUserName);
  };


  const changeAvatar = (avatar)=>{
    UpdateUserAvatar(avatar)
  }

  const usernameHandler = (e) => {
    const value = e.target.value;
    setUserName(value);

    if (value && value.length < 3) {
      setUsernameError("Short username");
    } else {
      setUsernameError("");
    }
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (e.target.value && !re.test(e.target.value)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    const re = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (e.target.value && !re.test(e.target.value)) {
      setPasswordError(
        "The password must be at least 8 characters long, one uppercase letter and one symbol."
      );
    } else {
      setPasswordError("");
    }
  };

      const blurHandler = (e) => {
        switch(e.target.name){
          case 'username':
            setUsernameValid(true)
          case 'email':
            setEmailValid(true)
            break
          case 'password':
            setPasswordValid(true)
            break
        }
          
      }
      
      

  return (
    <div className="container profile-container">
      <h1>Edit profile</h1>
      <section className="profile-section">
        <aside className="left-side-profile-block">
          <form className="image-form">
            <input
              type="image"
              src={avatar}
              alt="Profile Icon"
              className="profile-img"
            />
            {/* <span className="change-profile-img">+</span> */}
            <UploadPhoto setAvatar={setAvatar} />
          </form>
          <div className="rename">
            <input
              onBlur={(e) => blurHandler(e)}
              autoComplete="off"
              name="username"
              value={username}
              onChange={(e) => usernameHandler(e)}
              placeholder="Name"
              className="inputText"
              type="text"
            />
            <Button className="name-button" onClick={(e) => changeUserName(e)}>
              <img src={RenameIcon} alt="Rename Icon" className="rename-btn" />
            </Button>
            
          </div>
          {usernameValid && usernameError && (
            <div className="error__color">{usernameError}</div>
          )}
        </aside>
        <aside className="right-side-profile-block">
          <div className="form-block">
            <div className="form-head">
              <h2>Change your Email</h2>
              <div className="icons">
                <img src={OkIcon} alt="Success Icon" className="success-icon" />
                <img
                  src={CancelIcon}
                  alt="Cancel Icon"
                  className="cancel-icon"
                />
              </div>
            </div>
            <form className="change-profile-form">
              <h5>Enter your new email :</h5>
              <input
                name="email"
                placeholder="Email"
                type="text"
                onBlur={(e) => {
                  blurHandler(e);
                }}
                value={email}
                onChange={(e) => emailHandler(e)}
                required
              />

              <Button onClick={(e) => changeEmail(e)} className="apply-button">
                Apply
              </Button>
              {emailValid && emailError && (
                <div className="error__color">{emailError}</div>
              )}
            </form>
          </div>

          <div className="form-block">
            <div className="form-head">
              <h2>Change your password</h2>
              <div className="form-info-icons">
                <img src={OkIcon} alt="Success Icon" className="success-icon" />
                <img
                  src={CancelIcon}
                  alt="Cancel Icon"
                  className="cancel-icon"
                />
              </div>
            </div>
            <form className="change-profile-form">
              <h5>Enter your new password :</h5>
              <input
                name="password"
                placeholder="password"
                type="password"
                onChange={(e) => {
                  passwordHandler(e);
                }}
                onBlur={(e) => {
                  blurHandler(e);
                }}
                value={password}
                required
              />
              <Button
                onClick={(e) => changePassword(e)}
                className="apply-button"
              >
                Apply
              </Button>
              {passwordValid && passwordError && (
                <div className="error__color">{passwordError}</div>
              )}
            </form>
          </div>
          <div className="form-block">
            <h2>Link your Steam account:</h2>
            <Button onClick={() => steamRedirect()} className="steam-button" icon={<SteamIcon />}>
              Log in
            </Button>
          </div>
        </aside>
      </section>
    </div>
  );
}
