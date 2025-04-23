import { sendRequestFriend } from "../../../service/UserService";
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
    getAllUsersData,
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
    // ===== СТЕЙТИ =====
    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState("");
    const [activeTab, setActiveTab] = useState("friends");
    const [friendsList, setFriendsList] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleCount, setVisibleCount] = useState(4);
    const [visibleAddCount, setVisibleAddCount] = useState(4);
    const [allUsers, setAllUsers] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [friendsIds, setFriendsIds] = useState([]);


    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // ===== ЗАВАНТАЖЕННЯ ДАНИХ ПРО КОРИСТУВАЧА ТА ДРУЗІВ =====
    useEffect(() => {
        getUserData().then((res) => {
            setAvatar(res.avatar_url);
            setUsername(res.username);
        });

        const fetchFriends = async () => {
            try {
                const res = await getAllFriends();
                if (res?.friends) {
                    setFriendsList(res.friends);
                    setFriendsIds(res.friends.map((friend) => friend.id));
                }
            } catch (err) {
                console.error("Failed to load friends:", err);
            }
        };

        fetchFriends();

        getRequestFriend()
            .then((res) => {
                if (res?.sent_requests) {
                    setSentRequests(res.sent_requests.map((req) => req.receiver.id));
                }
            })
            .catch((err) => console.error("Failed to load sent requests", err));
    }, []);

    // ===== ЗАВАНТАЖЕННЯ ЗАПИТІВ У ВКЛАДЦІ "ЗАПИТИ" =====
    useEffect(() => {
        if (activeTab === "requests") {
            getRequestFriend()
                .then((res) => {
                    if (res?.requests) {
                        const filteredRequests = res.requests.filter(
                            (req) => !friendsIds.includes(req.requester.id)
                        );
                        setFriendRequests(filteredRequests);
                    }
                })
                .catch((err) => console.error("Failed to load requests", err));
        }
    }, [activeTab, friendsIds]); // Додано friendsIds як залежність


    // ===== ПІДКЛЮЧЕННЯ ДО SOCKET.IO ТА ОНОВЛЕННЯ СТАТУСУ ДРУЗІВ =====
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

    // ===== СТВОРЕННЯ ЧАТУ З ДРУГОМ =====
    const handleCreateChat = (recipientId) => {
        createChat(recipientId, token)
            .then((chat) => {
                localStorage.setItem("chat_id", chat.id);
                navigate("/Chat");
            })
            .catch((err) => console.error("Failed to create chat", err));
    };

    // ===== ОБРОБНИКИ ПРИЙНЯТТЯ І ВІДМОВИ ЗАПИТІВ =====
    const handleAccept = async (id) => {
        try {
            await acceptRequestFriend(id);
            setFriendRequests((prev) =>
                prev.filter((req) => req.requester.id !== id)
            );
            setFriendsIds((prev) => [...prev, id]);
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
            setSentRequests((prev) => prev.filter((uid) => uid !== id)); 
        } catch (err) {
            console.error("Error rejecting request", err);
        }
    };
    
    // ===== ФІЛЬТРАЦІЯ КОРИСТУВАЧІВ ЗА ІМ'ЯМ =====
    const filterUsers = (searchText, listOfUsers) => {
        if (!searchText) return listOfUsers;
        return listOfUsers.filter(({ username }) =>
            username.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const filteredFriends = filterUsers(searchTerm, friendsList);
    const filteredUsers = filterUsers(searchTerm, allUsers);

    // ===== ПАГІНАЦІЯ ДРУЗІВ І ВСІХ КОРИСТУВАЧІВ =====
    const handleShowMore = () => setVisibleCount((prev) => prev + 4);
    const handleShowAddMore = () => setVisibleAddCount((prev) => prev + 4);

    // ===== ЗАВАНТАЖЕННЯ ВСІХ КОРИСТУВАЧІВ У ВКЛАДЦІ "ДОДАТИ" =====
    useEffect(() => {
        if (activeTab === "add") {
            getAllUsersData(searchTerm).then((res) => {
                setAllUsers(res.data);
            });
        }
    }, [activeTab, searchTerm]);

    // ===== ВІДПРАВКА ЗАПИТУ В ДРУЗІ =====
    const handleSendRequest = async (userId) => {
        try {
            await sendRequestFriend(userId);
            setSentRequests((prev) => [...prev, userId]);
        } catch (err) {
            console.error("Failed to send friend request:", err);
        }
    };

    // ===== РЕНДЕР ВМІСТУ ВКЛАДОК =====
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
                                        <p className={`${style.player_name} player-name`}>{user.username}</p>
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
                    <div className={style.friends_block}>
                        {friendRequests.map((req) => (
                            <div
                                className={`${style.player_info_block} player-info-block`}
                                key={req.requester.id}
                            >
                                <div className="player-avatar">
                                    <img
                                        src={req.requester.avatar_url || ProfileIcon}
                                        alt="User avatar"
                                        onError={(e) => (e.target.src = ProfileIcon)}
                                    />
                                    <span
                                        className={`status-indicator ${req.requester.status}`}
                                    ></span>
                                </div>
                                <div className="player-details">
                                    <p className="player-name">{req.requester.username}</p>
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <button
                                        style={{ backgroundColor: "green" }}
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
                );
            case "add":
                return (
                    <>
                        <input
                            type="text"
                            placeholder="Search by username..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className={style.friends_block}>
                            {filteredUsers.slice(0, visibleAddCount).map((user) => {
                                const isFriend = friendsIds.includes(user.id);
                                const isRequested = sentRequests.includes(user.id);

                                return (
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
                                            <span className={`status-indicator ${user.status}`}></span>
                                        </div>
                                        <div className="player-details">
                                            <p className={`${style.player_name} player-name`}>{user.username}</p>
                                        </div>
                                        {isFriend ? (
                                            <span className="status-label">Friend</span>
                                        ) : isRequested ? (
                                            <span className="status-label">sending...</span>
                                        ) : (
                                            <button
                                                className="chat-button"
                                                onClick={() => handleSendRequest(user.id)}
                                            >
                                                Request
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {visibleAddCount < filteredUsers.length && (
                            <button
                                className={`${style.show_more_button} show-more-button`}
                                onClick={handleShowAddMore}
                            >
                                Show more ↓
                            </button>
                        )}
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
                <aside className={`${style.left_side_profile_block} left-side-profile-block`}>
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
                        className={`friends-btn search-input ${activeTab === "friends" ? style.active_button : ""}`}
                        onClick={() => setActiveTab("friends")}
                    >
                        <img src={FriendsIcon} alt="FriendIcon" />
                        Your friends
                    </Button>
                    <Button
                        className={`friends-btn search-input ${activeTab === "requests" ? style.active_button : ""}`}
                        onClick={() => setActiveTab("requests")}
                    >
                        <img src={FriendsIcon} alt="FriendIcon" />
                        Friend request
                    </Button>
                    <Button
                        className={`friends-btn search-input ${activeTab === "add" ? style.active_button : ""}`}
                        onClick={() => setActiveTab("add")}
                    >
                        <img src={FriendsIcon} alt="FriendIcon" />
                        Add friends
                    </Button>
                </aside>

                <aside className={`${style.right_side_profile_block} right-side-profile-block`}>
                    {renderContent()}
                </aside>
            </section>
        </div>
    );
}