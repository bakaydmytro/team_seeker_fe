import style from "./UserPage.module.css";

import React, { useEffect, useState } from "react";
import { getUserData, updateUserDataField,  UpdateUserAvatar} from "../../service/UserService";

import SteamConnect from "../Buttons/SteamConnect";
import { Button } from "antd";
import CancelIcon from "../../img/icons/CancelIcon.svg";
import OkIcon from "../../img/icons/OkIcon.svg";
import ProfileIcon from '../../img/icons/image 18.svg';
import RenameIcon from "../../img/icons/RenameIcon.svg";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage"

export default function UserPage() {
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
  const [closeAlert, setCloseAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

 
 

  const handleChange = async (e, field, value, setValue, setEmailError) => {
    e.preventDefault();
    try {
      const userDataResponse = await getUserData();
      setID(userDataResponse.id)
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

  
  return (
    <div  className={`${style.profile_container} container profile-container`}>
      <h1 className={style.h1} >User profile</h1>
      <section className={`${style.profile_section} profile-section`}>
        <aside className={`${style.left_side_profile_block} left-side-profile-block`}>
            <div className="img_block">
              <img
                type="image"
                src={avatar || ProfileIcon}
                alt="Profile Icon"
                className="profile-img"
              />
            </div>
            <div className={style.profile_section_username}>
                <p>KOKOS</p>
              </div>
        </aside>
        <div className="">
            <a onClick={()=> navigate("/EditProfile")}>Change Profile</a>
        </div>
      </section>
    </div>
  );
}
