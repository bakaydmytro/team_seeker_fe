import React, { useEffect, useState } from "react";

import ProfileIcon from "../../../img/icons/image 18.svg";
import usersData from "../users.json";
// import axios from 'axios';

// Фільтрація користувачів
const filterUsers = (searchText, listOfUsers) => {
  if (!searchText) return listOfUsers;
  return listOfUsers.filter(({ username }) =>
    username.toLowerCase().includes(searchText.toLowerCase())
  );
};

export default function SearchMain() {
  const [userList] = useState(usersData); // Використовуємо локальні дані
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(5); // Кількість видимих користувачів

  // Дебаунс-фільтрація пошуку
  useEffect(() => {
    const debounce = setTimeout(() => {
      setFilteredUsers(filterUsers(searchTerm, userList));
      setVisibleCount(5); // Скидаємо видимих користувачів при новому пошуку
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm, userList]);

  // Обробник кнопки "Show more"
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
                    <img src={ProfileIcon} alt="User avatar" />
                    <span className={`status-indicator ${user.status}`}></span>
                  </div>
                  <div className="player-details">
                    <p className="player-name">{user.username}</p>
                    <div className="player-hours-block">
                      <p>Email: </p>
                      <p>{user.email}</p>
                    </div>
                    <div className="player-status-block">
                      <p>Status: </p>
                      <p>{user.status}</p>
                    </div>
                  </div>
                  <button className="chat-button">Chat</button>
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
