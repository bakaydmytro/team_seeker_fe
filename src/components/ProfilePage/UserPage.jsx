import style from "./UserPage.module.css";

import React, { useEffect, useState } from "react";
import { getUserData, getAllUsersData,  sendRequestFriend} from "../../service/UserService";
import {fetchRequest , API_URL } from "../../service/FetchRequest"
import dota from "../../img/dota.jpg"
import csgo from "../../img/csgo.jpg" 
import rust from "../../img/rust.jpg"
import teamfortness from "../../img/team.jpg"
import SteamConnect from "../Buttons/SteamConnect";
import { Button } from "antd";
import CancelIcon from "../../img/icons/CancelIcon.svg";
import OkIcon from "../../img/icons/OkIcon.svg";
import ProfileIcon from '../../img/icons/image 18.svg';
import RenameIcon from "../../img/icons/RenameIcon.svg";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./AlertMessage"



export default function UserPage() {
  const [games, setGames] = useState([]);

  const [id, setID] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  
  const getGameHours = (appid) => {
    const game = games.find(g => g.appid === appid);
    return game ? Math.round(game.playtime_forever) : 0;
  };
  

 
 
    const friennds =  () => {
        sendRequestFriend(20)
    }

     const getAllUsersData = async ( appid) => {
      console.log("GET Request to:", `${API_URL}/api/users/search`);
    
      try {
        const response = await fetchRequest.get(`${API_URL}/api/users/search`);
        console.log(response)
        console.log("API Response (getAllUsersData):", response.data);
        return response.data;
      } catch (error) {
        console.error("API Error (getAllUsersData):", error.response);
        return { data: [] };  
      }
    };
    
    useEffect(() => {
      getUserData().then(res => {
        setUsername(res.username)
        setAvatar(res.avatar_url)
        console.log("User data:", res);
        setGames(res.games || []);
      });
    }, []);
    
   
   
  
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
                <p>{username}</p>
                <p onClick={() => friennds()}>Add friend</p>
              </div>
        </aside>
        <div className={style.navigate_userProfile_block}>
            <div className={style.navigate_userProfile} onClick={()=> navigate("/ProfilePage/edit")}><p>Change Profile</p></div>
            <div className={style.navigate_userProfile} onClick={()=> navigate("/ProfilePage/friends")}><p>Friends</p></div>
        </div>        

      </section>
      <section  className={style.section_activity}  >
        <div className={style.section_activity_title_block}>
            <p>Недавня активність</p>
        </div>
        <div className={style.section_activity_gameHourseBlock} >
            <div className={style.section_activity_gameHourseInfo}>
                <img src={dota} alt="" />
                <div className={style.houreGame_block}>
                    <p>Кількість годин</p>
                    <p>{getGameHours(570)}</p>
                </div>
            </div>
            <div className={style.section_activity_gameHourseInfo}>
                <img src={rust} alt="" />
                <div className={style.houreGame_block}>
                    <p>Кількість годин</p>
                    <p>{getGameHours(252490)}</p>
                </div>
            </div>
            <div className={style.section_activity_gameHourseInfo}>
                <img src={csgo} alt="" />
                <div className={style.houreGame_block}>
                    <p>Кількість годин</p>
                    <p>{getGameHours(730)}</p>
                </div>
            </div>
            <div className={style.section_activity_gameHourseInfo}>
                <img src={teamfortness} alt="" />
                <div className={style.houreGame_block} >
                    <p>Кількість годин</p>
                    <p>{getGameHours(440)}</p>
                </div>
            </div>
        </div>
        
      </section>
    </div>
  );
}
