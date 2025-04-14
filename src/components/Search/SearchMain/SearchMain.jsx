// import React, { useEffect, useState } from "react";
// import ProfileIcon from "../../../img/icons/image 18.svg";
// import { getAllUsersData } from "../../../service/UserService";
// import {createChat} from "../../../service/webSocket"
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";


// //! Фільтрація користувачів
// const filterUsers = (searchText, listOfUsers) => {
//   if (!searchText) return listOfUsers;
//   return listOfUsers.filter(({ username }) =>
//     username.toLowerCase().includes(searchText.toLowerCase())
//   );
// };

import React, { useEffect, useState } from "react";
import ProfileIcon from "../../../img/icons/image 18.svg";
import { getAllUsersData } from "../../../service/UserService";
import { createChat, connectSocket, onUserStatusChanged, removeUserStatusChangedListener } from "../../../service/webSocket";
import { useNavigate } from "react-router-dom";

const filterUsers = (searchText, listOfUsers) => {
  if (!searchText) return listOfUsers;
  return listOfUsers.filter(({ username }) =>
    username.toLowerCase().includes(searchText.toLowerCase())
  );
};

export default function SearchMain() {
  const [userList, setUserList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleCreateChat = (recipientId) => {
    createChat(recipientId, token)
      .then(chat => {
        localStorage.setItem("chat_id", chat.id);
        navigate("/Chat");
      })
      .catch(error => console.error("Failed to create chat", error));
  };

  useEffect(() => {
    // Connect to socket and set up status listener
    let isMounted = true;
    
    const setupSocket = async () => {
      try {
        await connectSocket();
        
        onUserStatusChanged(({ userId, status }) => {
          if (isMounted) {
            setUserList(prevList =>
              prevList.map(user =>
                user.id === userId ? { ...user, status } : user
              )
            );
          }
        });
      } catch (error) {
        console.error("Socket connection error:", error);
      }
    };

    setupSocket();

    return () => {
      isMounted = false;
      removeUserStatusChangedListener();
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsersData(searchTerm.trim() ? searchTerm : "", 1, 100);

        if (usersData?.data && Array.isArray(usersData.data)) {
          setUserList(usersData.data);
          setFilteredUsers(usersData.data);
        } else {
          console.error("Unexpected API response format:", usersData);
          setUserList([]);
          setFilteredUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUserList([]);
        setFilteredUsers([]);
      }
    };

    fetchUsers();
  }, [searchTerm]); // Changed dependency to searchTerm instead of navigate

  useEffect(() => {
    const debounce = setTimeout(() => {
      setFilteredUsers(filterUsers(searchTerm, userList));
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm, userList]);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };
  return (
    <section className="search-section">
      <div className="container search-container">
        <h1 className="title">Find your teammate</h1>

        {/* Поле пошуку */}
        <div className="search-block">
          <input
            type="text"
            placeholder="🔍 Search player..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Список гравців */}
          <div className="player-list">
            {filteredUsers.length > 0 ? (
              filteredUsers.slice(0, visibleCount).map((user) => (
                <div className="player-info-block" key={user.id}>
                  <div className="player-avatar">
                  <img src={user.avatar_url || ProfileIcon} alt="User avatar" onError={(e) => e.target.src = ProfileIcon} />
                    <span className={`status-indicator ${user.status}`}></span>
                  </div>
                  <div className="player-details">
                    <p className="player-name">{user.username}</p>
                    <div className="player-hours-block">
                    <p>Hours played: </p>
                    <p>{Math.floor((user.playtime_forever || 0) / 60)}h</p>
                    </div>
                    <div className="player-status-block">
                      <p>Status: </p>
                      <p>{user.status}</p>
                    </div>
                  </div>
                    <button onClick={()=>handleCreateChat(user.id)} className="chat-button">Chat</button>
                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>

        {/* Кнопка "Show more" */}
        {visibleCount < filteredUsers.length && (
          <button className="show-more-button" onClick={handleShowMore}>
            Show more ↓
          </button>
        )}
      </div>
    </section>
  );
}
