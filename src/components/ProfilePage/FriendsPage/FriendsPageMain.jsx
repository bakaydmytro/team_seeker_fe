// import style from "./FriendsPage.module.css";
// import { useEffect, useState } from "react";
// import ProfileIcon from "../../../img/icons/image 18.svg";
// import FriendsIcon from "../../../img/icons/friends.svg";
// import { getUserData, getAllUsersData,sendRequestFriend ,getRequestFriend ,acceptRequestFriend,rejectRequestFriend,getAllFriends} from "../../../service/UserService";
// import { Button } from "antd";
// import { createChat, connectSocket, onUserStatusChanged, removeUserStatusChangedListener } from "../../../service/webSocket";
// import { useNavigate } from "react-router-dom";

// export default function FriendsPageMain() {
//     const [avatar, setAvatar] = useState(null);
//     const [username, setUsername] = useState("");
//     const [activeTab, setActiveTab] = useState("friends");
//     const [friendsList, setFriendsList] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [visibleCount, setVisibleCount] = useState(4); // <== NEW
//     const navigate = useNavigate();
//     const token = localStorage.getItem("token");


//     const [friendRequests, setFriendRequests] = useState([]);

//     useEffect(() => {
//     if (activeTab === "requests") {
//         getRequestFriend()
//         .then(res => {
//             if (res?.requests) {
//             setFriendRequests(res.requests);
//             }
//         })
//         .catch(err => console.error("Failed to load requests", err));
//     }
//     }, [activeTab]);

//     const handleAccept = async (id) => {
//         try {
//           await acceptRequestFriend(id);
//           setFriendRequests(prev => prev.filter(req => req.requester.id !== id));
//         } catch (err) {
//           console.error("Error accepting request", err);
//         }
//       };
      
//       const handleReject = async (id) => {
//         try {
//           await rejectRequestFriend(id);
//           setFriendRequests(prev => prev.filter(req => req.requester.id !== id));
//         } catch (err) {
//           console.error("Error rejecting request", err);
//         }
//       };


//     useEffect(() => {
//         getUserData().then(response => {
//             setAvatar(response.avatar_url);
//             setUsername(response.username);
//         });

//         const fetchFriends = async () => {
//             try {
//                 const res = await getAllFriends("", 1, 100);
//                 console.log(res)
//                 if (res?.data) {
//                     setFriendsList(res.data);
//                 }
//             } catch (err) {
//                 console.error("Failed to load users", err);
//             }
//         };

//         fetchFriends();
//     }, []);

//     useEffect(() => {
//         let isMounted = true;

//         const setupSocket = async () => {
//             try {
//                 await connectSocket();
//                 onUserStatusChanged(({ userId, status }) => {
//                     if (isMounted) {
//                         setFriendsList(prev =>
//                             prev.map(user =>
//                                 user.id === userId ? { ...user, status } : user
//                             )
//                         );
//                     }
//                 });
//             } catch (err) {
//                 console.error("Socket error:", err);
//             }
//         };

//         setupSocket();

//         return () => {
//             isMounted = false;
//             removeUserStatusChangedListener();
//         };
//     }, []);

//     const handleCreateChat = (recipientId) => {
//         createChat(recipientId, token)
//             .then(chat => {
//                 localStorage.setItem("chat_id", chat.id);
//                 navigate("/Chat");
//             })
//             .catch(error => console.error("Failed to create chat", error));
//     };

//     const filteredFriends = friendsList.filter(user =>
//         user.username.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleShowMore = () => {
//         setVisibleCount(prev => prev + 4);
//     };

//     const renderContent = () => {
//         switch (activeTab) {
//             case "friends":
//                 return (
//                     <>
//                         <input
//                             type="text"
//                             placeholder="🔍 Search player..."
//                             className="search-input"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                         />
//                         <div className={style.friends_block}>
//                             {filteredFriends.slice(0, visibleCount).map((user, idx) => (
//                                 <div className={`${style.player_info_block} player-info-block`} key={idx}>
//                                     <div className="player-avatar">
//                                         <img
//                                             src={user.avatar_url || ProfileIcon}
//                                             alt="User avatar"
//                                             onError={(e) => e.target.src = ProfileIcon}
//                                         />
//                                         <span className={`status-indicator ${user.status}`}></span>
//                                     </div>
//                                     <div className="player-details">
//                                         <p className="player-name">{user.username}</p>
//                                     </div>
//                                     <button className="chat-button" onClick={() => handleCreateChat(user.id)}>
//                                         Chat
//                                     </button>
//                                 </div>
//                             ))}
//                         </div>
//                         {visibleCount < filteredFriends.length && (
//                             <button className={`${style.show_more_button} show-more-button`} onClick={handleShowMore}>
//                                 Show more ↓
//                             </button>
//                         )}
//                     </>
//                 );
//                 case "requests":
//                     return (
//                       <>
//                         {friendRequests.length === 0 ? (
//                           <p className={style.placeholder_text}>You don’t have any friend requests yet.</p>
//                         ) : (
//                           <div className={style.friends_block}>
//                             {friendRequests.map((req, idx) => (
//                               <div className={style.player_info_block} key={idx}>
//                                 <div className="player-avatar">
//                                   <img
//                                     src={req.requester.avatar_url || ProfileIcon}
//                                     alt="User avatar"
//                                     onError={(e) => e.target.src = ProfileIcon}
//                                   />
//                                 </div>
//                                 <div className="player-details">
//                                   <p className="player-name">{req.requester.username}</p>
//                                 </div>
//                                 <button className="chat-button" onClick={() => handleAccept(req.requester.id)}>Accept</button>
//                                 <button className="chat-button" onClick={() => handleReject(req.requester.id)}>Reject</button>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </>
//                     );
                  
//             case "add":
//                 return (
//                     <>
//                         <input
//                             type="text"
//                             placeholder="Search by username..."
//                             className="search-input"
//                         />
//                         <p className={style.placeholder_text}>Start typing to find new friends.</p>
//                     </>
//                 );
//             default:
//                 return null;
//         }
//     };
//     const friennds =  () => {
//         sendRequestFriend(21)
//     }
//     const getrequest =  () => {
//         getRequestFriend()
//     }


  
//     return (
//         <div className={`${style.profile_container} profile-container`}>
//                 <h1 className={style.h1} >Friends</h1>
//             <section className={`${style.profile_section} profile-section`}>
//                 <aside className="left-side-profile-block">
//                     <form className={style.image_form}>
//                         <div className="img_block">
//                             <img
//                                 src={avatar || ProfileIcon}
//                                 alt="Profile Icon"
//                                 className={style.image_bob}
//                             />
//                         </div>
//                         <p className={style.user_name}>{username}</p>
//                     </form>

//                     <Button
//                         className={`friends-btn search-input ${activeTab === "friends" ? style.active_button : ""}`}
//                         onClick={() => setActiveTab("friends")}
//                     >
//                         <img src={FriendsIcon} alt="FriendIcon" />Your friends
//                     </Button>
//                     <Button
//                         className={`friends-btn search-input ${activeTab === "requests" ? style.active_button : ""}`}
//                         onClick={() => setActiveTab("requests")}
//                     >
//                         <img src={FriendsIcon} alt="FriendIcon" />Friend request
//                     </Button>
//                     <Button
//                         className={`friends-btn search-input ${activeTab === "add" ? style.active_button : ""}`}
//                         onClick={() => setActiveTab("add")}
//                     >
//                         <img src={FriendsIcon} alt="FriendIcon" />Add friends
//                     </Button>
//                 </aside>

//                 <aside className={`${style.right_side_profile_block} right-side-profile-block`}>
//                     {renderContent()}
//                 </aside>
//             </section>
//             <button onClick={() => friennds(21)}>Send friens requesr</button>
//             <button onClick={() => getrequest()}>get request</button>
//         </div>
//     );
// }

import style from "./FriendsPage.module.css";
import { useEffect, useState } from "react";
import ProfileIcon from "../../../img/icons/image 18.svg";
import FriendsIcon from "../../../img/icons/friends.svg";
import {
  getUserData,
  getAllFriends,
  getRequestFriend,
  acceptRequestFriend,
  rejectRequestFriend,
} from "../../../service/UserService";
import { Button } from "antd";
import {
  createChat,
  connectSocket,
  onUserStatusChanged,
  removeUserStatusChangedListener
} from "../../../service/webSocket";
import { useNavigate } from "react-router-dom";

export default function FriendsPageMain() {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("friends");
  const [friendsList, setFriendsList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getUserData().then((res) => {
      setAvatar(res.avatar_url);
      setUsername(res.username);
    });

    // Завантаження друзів
    const fetchFriends = async () => {
      try {
        const res = await getAllFriends(); 
        if (res?.friends) {
          setFriendsList(res.friends);
          console.log(friendsList)
        }
      } catch (err) {
        console.error("Failed to load friends:", err);
      }
    };

    fetchFriends();
  }, []);

  useEffect(() => {
    if (activeTab === "requests") {
      getRequestFriend()
        .then((res) => {
          if (res?.requests) setFriendRequests(res.requests);
        })
        .catch((err) => console.error("Failed to load requests", err));
    }
  }, [activeTab]);

  useEffect(() => {
    let isMounted = true;

    const setupSocket = async () => {
      try {
        await connectSocket();
        onUserStatusChanged(({ userId, status }) => {
          if (isMounted) {
            setFriendsList((prev) =>
              prev.map((user) =>
                user.id === userId ? { ...user, status } : user
              )
            );
          }
        });
      } catch (err) {
        console.error("Socket error:", err);
      }
    };

    setupSocket();

    return () => {
      isMounted = false;
      removeUserStatusChangedListener();
    };
  }, []);

  const handleCreateChat = (recipientId) => {
    createChat(recipientId, token)
      .then((chat) => {
        localStorage.setItem("chat_id", chat.id);
        navigate("/Chat");
      })
      .catch((err) => console.error("Failed to create chat", err));
  };

  const handleAccept = async (id) => {
    try {
      await acceptRequestFriend(id);
      setFriendRequests((prev) =>
        prev.filter((req) => req.requester.id !== id)
      );
    } catch (err) {
      console.error("Error accepting request", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectRequestFriend(id);
      setFriendRequests((prev) =>
        prev.filter((req) => req.requester.id !== id)
      );
    } catch (err) {
      console.error("Error rejecting request", err);
    }
  };

  const filteredFriends = friendsList.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "friends":
        return (
          <>
            <input
              type="text"
              placeholder="🔍 Search friends..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className={style.friends_block}>
              {filteredFriends.slice(0, visibleCount).map((user) => (
                <div
                  className={`${style.player_info_block} player-info-block`}
                  key={user.id}
                >
                  <div className="player-avatar">
                    <img
                      src={user.avatar_url || ProfileIcon}
                      alt="User avatar"
                      onError={(e) => (e.target.src = ProfileIcon)}
                    />
                    <span
                      className={`status-indicator ${user.status}`}
                    ></span>
                  </div>
                  <div className="player-details">
                    <p className="player-name">{user.username}</p>
                  </div>
                  <button
                    className="chat-button"
                    onClick={() => handleCreateChat(user.id)}
                  >
                    Chat
                  </button>
                </div>
              ))}
            </div>
            {visibleCount < filteredFriends.length && (
              <button
                className={`${style.show_more_button} show-more-button`}
                onClick={handleShowMore}
              >
                Show more ↓
              </button>
            )}
          </>
        );
        case "requests":
            return friendRequests.length === 0 ? (
              <p className={style.placeholder_text}>
                You don’t have any friend requests yet.
              </p>
            ) : (
              <>
                <div className={style.friends_block}>
                  {friendRequests.map((req) => (
                    <div
                      className={`${style.player_info_block} player-info-block`}
                      key={req.requester.id}
                    >
                      <div style={{marginRight:"5px"}} className="player-avatar">
                        
                        <img
                          src={req.requester.avatar_url || ProfileIcon}
                          alt="User avatar"
                          onError={(e) => (e.target.src = ProfileIcon)}
                        />
                        <span
                            className={`status-indicator ${friendsList.status}`}
                        ></span>
                      </div>
                      <div className="player-details">
                        <p className="player-name">{req.requester.username}</p>
                      </div>
                      <div
                       style={{display: "flex" , gap:"10px"}}
                       className="div_button-block">
                        <button
                            style={{backgroundColor:"green"}}
                            className="chat-button"
                            onClick={() => handleAccept(req.requester.id)}
                        >
                            Accept
                        </button>
                        <button
                            className="chat-button"
                            onClick={() => handleReject(req.requester.id)}
                        >
                            Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            );
          
      default:
        return null;
    }
  };
  


  return (
    <div className={`${style.profile_container} profile-container`}>
      <h1 className={style.h1}>Friends</h1>
      <section className={`${style.profile_section} profile-section`}>
        <aside className="left-side-profile-block">
          <form className={style.image_form}>
            <div className="img_block">
              <img
                src={avatar || ProfileIcon}
                alt="Profile Icon"
                className={style.image_bob}
              />
            </div>
            <p className={style.user_name}>{username}</p>
          </form>

          <Button
            className={`friends-btn search-input ${
              activeTab === "friends" ? style.active_button : ""
            }`}
            onClick={() => setActiveTab("friends")}
          >
            <img src={FriendsIcon} alt="FriendIcon" />
            Your friends
          </Button>
          <Button
            className={`friends-btn search-input ${
              activeTab === "requests" ? style.active_button : ""
            }`}
            onClick={() => setActiveTab("requests")}
          >
            <img src={FriendsIcon} alt="FriendIcon" />
            Friend request
          </Button>
          
        </aside>

        <aside
          className={`${style.right_side_profile_block} right-side-profile-block`}
        >
          {renderContent()}
        </aside>
       
      </section>
      {/* <button onClick={() => friennds()}>Send friens requesr</button> */}
    </div>
  );
}
