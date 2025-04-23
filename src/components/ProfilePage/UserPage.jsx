import style from "./UserPage.module.css";

import React, { useEffect, useState } from "react";
import { getUserData, updateUserDataField,  UpdateUserAvatar,  sendRequestFriend} from "../../service/UserService";
import dota from "../../img/dota.jpg"
import SteamConnect from "../Buttons/SteamConnect";
import { Button } from "antd";
import CancelIcon from "../../img/icons/CancelIcon.svg";
import OkIcon from "../../img/icons/OkIcon.svg";
import ProfileIcon from '../../img/icons/image 18.svg';
import RenameIcon from "../../img/icons/RenameIcon.svg";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage"

export default function UserPage() {

  const [id, setID] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

 
 
    const friennds =  () => {
        sendRequestFriend(20)
    }
    
  
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
            <a onClick={()=> navigate("/ProfilePage/edit")}>Change Profile</a>
            
        </div>
        <a onClick={()=> navigate("/ProfilePage/friends")}>Friends</a>
        <button onClick={() => friennds()}>Send friens requesr</button>

      </section>
      <section className="section-activity">
        <div className="section_activity_title-block">
            <p>Недавня активність</p>
        </div>
        <div className="section-activity_gameHourseInfo">
            <img src={dota} alt="" />
        </div>
      </section>
    </div>
  );
}
