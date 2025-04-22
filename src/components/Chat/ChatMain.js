
// import { format } from 'date-fns';
// import ProfileIcon from '../../img/icons/image 18.svg';
// import './ChatMain.css';
// import { useState, useEffect, useRef, useCallback} from 'react';
// import { getUserData } from '../../service/UserService.js';
// import { useNavigate } from 'react-router-dom';
// import SendButton from '../Buttons/SendButton.js'
// import { 
//     connectSocket, 
//     disconnectSocket, 
//     joinChat, 
//     leaveChat, 
//     sendMessage, 
//     onNewMessage,
//     createChat,
//     getMessagesAll,
//     getUsersAll,
//     getUserChats
// } from "../../service/webSocket.js";
// function ChatMain() {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');
//     const [userId, setUserId] = useState('');
//     const [userInfo, setUserInfo] = useState('');
//     const [usersChat, setUsersChat] = useState([]);
//     const [chat_id, setChatId] = useState(null);
//     const [username , setUsername] = useState('')
//     const [avatar , setAvatar] = useState('')
//     const token = localStorage.getItem('token');
//     const [check , setCheck] = useState("")
//     const [lastMessage , setLastMessage] = useState('')
//     // const chat_id = 28
//     const navigate = useNavigate();

//     const messagesEndRef = useRef(null)

//     const scrollToBottom = () => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//     }
  
//     useEffect(() => {
//       scrollToBottom()
//     }, [messages]);

    
    
//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const chats = await getUserChats();
//             console.log("User chats:", chats);
            
//             const chatsWithLastMessages = await Promise.all(
//               chats.map(async chat => {
//                 const messagesRes = await getMessagesAll(chat.id);
//                 const lastMessage = messagesRes.messages?.[messagesRes.messages.length - 1];
                
//                 return {
//                   ...chat, // зберігаємо всі дані чату
//                   lastMessage: lastMessage?.content || "Немає повідомлень",
//                   lastMessageTime: lastMessage?.createdAt || ""
//                 };
//               })
//             );
            
//             setUsersChat(chatsWithLastMessages);
            
//           } catch (error) {
//             console.error("Error fetching data:", error);
//           }
//         };
      
//         fetchData();
//       }, [chat_id]);

//     useEffect(() => {
        
//         const chat_id = localStorage.getItem("chat_id")
//         if (!chat_id) return 
        
//         setChatId(chat_id)
//         initChat(chat_id)
        
      
//         return () => {
//             leaveChat(chat_id);
//             disconnectSocket();
//         };

//     }, [chat_id]);

//     const initChat = (chat_id) => {
//         getUserData().then(response => {
//             setUserId(response.id)            
//         })
//         console.log("id ----" , userId)
//             getUsersAll(chat_id).then(response => console.log("DSXFCGHVBJKNML," ,response))
//             getUserChats().then(response => {
//                 setUsersChat(response)
//                 console.log("1234567890-=" , response.map (data  => (console.log(data))))
//             })
            
//             connectSocket()
//                 .then(response => {
//                     if (response === 200) {
//                         setCheck(200);
//                     }
//                 });
        
//             joinChat(chat_id);
        
//             getMessagesAll(chat_id)
//                 .then(response => {
//                     console.log(response.messages)
//                     if (response.messages) {
//                         setMessages(response.messages);
//                         console.log(response.messages)
                        
//                     }
//                 })
//                 .catch(error => console.error("Error fetching messages:", error));
            
                
            
//             const handleNewMessage = (newMessage) => {
//                 scrollToBottom()
//                 console.log("New message received:", newMessage);
//                 setUsersChat(prevChats =>
//                     prevChats.map(chat =>
//                         chat.id === newMessage.chatId
//                             ? {
//                                 ...chat,
//                                 lastMessage: newMessage.content,
//                                 lastMessageTime: newMessage.createdAt
//                             }
//                             : chat
//                     )
//                 );
        
//                 // Оновлюємо стан через функціональний підхід
//                 setMessages(prevMessages => {
//                     const updatedMessages = [...prevMessages, newMessage];
//                     console.log("Updated messages:", updatedMessages); 
//                     return updatedMessages;
//                 });
//              };

//             onNewMessage(handleNewMessage);  
//     }
    
 
 
//     const handleSendMessage = () => {
//         if (message.trim() === '') return; 
//         if (!userId) return console.error("User ID is missing.");
    
//         sendMessage(chat_id, message); // Відправляємо повідомлення на сервер
//         setMessage("");  // Очищаємо поле вводу
//     };
    

//     const formatTime = (dateString) => {
//         try {
//             const date = new Date(dateString);
//             return isNaN(date.getTime()) 
//                 ? "Новий чат" 
//                 : date.toLocaleTimeString('uk-UA', {hour: '2-digit', minute:'2-digit'});
//         } catch {
//             return "--:--";
//         }
//     };
    

//     return (
//         <div className="container-chat">
//             <div className="main">
//                 <section className="main_section-title">
//                     <div className='section-title_wrapper'> 
//                         <div className="section-title_block-title">
//                             <h1>Message</h1>
//                         </div>
//                         <div className="section-title_block-profile-info">
//                             <img
//                                 style={{width:"50px" ,  height: "51px" , borderRadius: "30px"}}
//                                 className='section-title_photo' src={avatar || ProfileIcon} alt="Profile Icon" />
//                             <p className='section-title_userName'>{username}</p>
//                             <div 
//                                 className='section-title_checker'
//                                 style={{
//                                     backgroundColor: check == 200? "green" : "red"
//                                 }}
//                             ></div>
//                         </div>
//                     </div>
//                 </section>
//                 <div className='container_chat'>
//                     <section className='main_section-usersChat'>
//                         <div className='section-usersChat_block'>
//                                 {usersChat.flatMap(chat => 
//                                     chat.Users?.map(user => {
                                        
//                                         return (
//                                             <div 
//                                                 key={`${chat.id}-${user.id}`} 
//                                                 onClick={() => {
//                                                     setChatId(chat.id); 
//                                                     setAvatar(user.avatar_url)
//                                                     setUsername(user.username)
//                                                     localStorage.setItem("chat_id", chat.id);
//                                                     console.log("AVVATAR" ,user.avatar_url)
//                                                 }} 

//                                                 className={`section-usersChat_userBlock ${Number(chat.id) === Number(chat_id) ? 'active' : ''}`}                                            >
//                                                 <div className='section-usersChat_blockAvatar'>
//                                                     <img 
//                                                         className='section-usersChat_avatar' 
//                                                         src={user.avatar_url || ProfileIcon}
//                                                         style={{width:"50px" ,  height: "51px" , borderRadius: "30px"}}
//                                                         alt={`${user.username}'s avatar`}
//                                                         onError={(e) => {
//                                                             e.target.src = ProfileIcon;
//                                                             e.target.onerror = null;
//                                                         }}
//                                                     />
//                                                     <div   
//                                                         style={{ backgroundColor: user.status === "online" ? "green" : "red" }} 
//                                                         className='section-usersChat_online'>
//                                                     </div>
//                                                 </div>
                                                
//                                                 <div className='section-usersChat_infoUsers'> 
//                                                     <div className='section-usersChat_blockText'>
//                                                         <p>{user.username}</p>
//                                                         <p>{formatTime(chat.lastMessageTime)}</p> 
//                                                         {/* {format(new Date(chat.lastMessageTime), 'HH:mm')} */}
//                                                     </div>
//                                                     <div className='section-usersChat_blockText'>
//                                                         <p>{chat.lastMessage || "No messages"}</p>
//                                                         <p>1</p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         );
//                                     }) ?? [] 
//                                 )}
//                             {/* </div> */}
//                         </div>
//                     </section>
//                     <section className='main_section-chat'>
//                         <div className='section-chat_block'>
//                             <div className='section-chat_wrapper' >
//                             {messages.map((msg, index) => {
                                
//                                 // console.log(`Message ${index}: sender_id =`, msg.sender_id, "userId =", userId);
//                                 return (
//                                     <div key={index} className={msg.sender_id === userId ? "section-chat_block-info my-message" : "section-chat_block-info other-message"}>
//                                         <div className='section-chat_block-text'>
//                                             <div className='section-chat_content'>{msg.content}</div> 
//                                             <div className='section-chat_date'>{formatTime(msg.createdAt)}</div>
//                                         </div>
//                                         <div ref={messagesEndRef} />
//                                     </div>
//                                 );
//                             })}
//                             </div>
//                             <div className='section-chat_block-button'>
//                                 <SendButton 
//                                     message= {message}
//                                     handleSendMessage ={handleSendMessage}
//                                     setMessage = {setMessage}
//                                 />
//                             </div>
//                         </div>
//                     </section>
//                 </div>
                
//             </div>

            
//         </div>
//     );
// }

// export default ChatMain;




import { format } from 'date-fns';
import ProfileIcon from '../../img/icons/image 18.svg';
import './ChatMain.css';
import { useState, useEffect, useRef, useCallback} from 'react';
import { getUserData } from '../../service/UserService.js';
import { useNavigate } from 'react-router-dom';
import SendButton from '../Buttons/SendButton.js'
// import {filterUsers} from "../Search/SearchMain/SearchMain.jsx"
import { 
    connectSocket, 
    disconnectSocket, 
    joinChat, 
    leaveChat, 
    sendMessage, 
    onNewMessage,
    createChat,
    getMessagesAll,
    getUsersAll,
    getUserChats
} from "../../service/webSocket.js";
function ChatMain() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [usersChat, setUsersChat] = useState([]);
    const [chat_id, setChatId] = useState(null);
    const [username , setUsername] = useState('')
    const [avatar , setAvatar] = useState('')
    const token = localStorage.getItem('token');
    const [check , setCheck] = useState("")
    const [lastMessage , setLastMessage] = useState('')

    const [searchTerm, setSearchTerm] = useState('');

    const filterUsers = (users, searchTerm) => {
        if (!Array.isArray(users)) return [];
      
        if (!searchTerm) return users;
      
        return users.filter(user =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
      };
      
    
    // const chat_id = 28
    const navigate = useNavigate();

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);

    
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const chats = await getUserChats();
            console.log("User chats:", chats);
            
            const chatsWithLastMessages = await Promise.all(
              chats.map(async chat => {
                const messagesRes = await getMessagesAll(chat.id);
                const lastMessage = messagesRes.messages?.[messagesRes.messages.length - 1];
                
                return {
                  ...chat, // зберігаємо всі дані чату
                  lastMessage: lastMessage?.content || "Немає повідомлень",
                  lastMessageTime: lastMessage?.createdAt || ""
                };
              })
            );
            
            setUsersChat(chatsWithLastMessages);
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
      
        fetchData();
      }, [chat_id]);

    useEffect(() => {
        
        const chat_id = localStorage.getItem("chat_id")
        if (!chat_id) return 
        
        setChatId(chat_id)
        initChat(chat_id)
        
      
        return () => {
            leaveChat(chat_id);
            disconnectSocket();
        };

    }, [chat_id]);

    const initChat = (chat_id) => {
        getUserData().then(response => {
            setUserId(response.id)            
        })
        console.log("id ----" , userId)
            getUsersAll(chat_id).then(response => console.log("DSXFCGHVBJKNML," ,response))
            getUserChats().then(response => {
                setUsersChat(response)
                console.log("1234567890-=" , response.map (data  => (console.log(data))))
            })
            
            connectSocket()
                .then(response => {
                    if (response === 200) {
                        setCheck(200);
                    }
                });
        
            joinChat(chat_id);
        
            getMessagesAll(chat_id)
                .then(response => {
                    console.log(response.messages)
                    if (response.messages) {
                        setMessages(response.messages);
                        console.log(response.messages)
                        
                    }
                })
                .catch(error => console.error("Error fetching messages:", error));
            
                
            
            const handleNewMessage = (newMessage) => {
                scrollToBottom()
                console.log("New message received:", newMessage);
                setUsersChat(prevChats =>
                    prevChats.map(chat =>
                        chat.id === newMessage.chatId
                            ? {
                                ...chat,
                                lastMessage: newMessage.content,
                                lastMessageTime: newMessage.createdAt
                            }
                            : chat
                    )
                );
        
                // Оновлюємо стан через функціональний підхід
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages, newMessage];
                    console.log("Updated messages:", updatedMessages); 
                    return updatedMessages;
                });
             };

            onNewMessage(handleNewMessage);  
    }
    
 
 
    const handleSendMessage = () => {
        if (message.trim() === '') return; 
        if (!userId) return console.error("User ID is missing.");
    
        sendMessage(chat_id, message); // Відправляємо повідомлення на сервер
        setMessage("");  // Очищаємо поле вводу
    };
    

    const formatTime = (dateString) => {
        try {
            const date = new Date(dateString);
            return isNaN(date.getTime()) 
                ? "Новий чат" 
                : date.toLocaleTimeString('uk-UA', {hour: '2-digit', minute:'2-digit'});
        } catch {
            return "--:--";
        }
    };
    

    return (
        <div className="container-chatMain">
            <div className="main">
                {/* <section className="main_section-title">
                    <div className='section-title_wrapper'> 
                        <div className="section-title_block-title">
                            <h1>Message</h1>
                        </div>
                        <div className="section-title_block-profile-info">
                            <img
                                style={{width:"50px" ,  height: "51px" , borderRadius: "30px"}}
                                className='section-title_photo' src={avatar || ProfileIcon} alt="Profile Icon" />
                            <p className='section-title_userName'>{username}</p>
                            <div 
                                className='section-title_checker'
                                style={{
                                    backgroundColor: check == 200? "green" : "red"
                                }}
                            ></div>
                        </div>
                    </div>
                </section> */}
                <div className='container_chat'>
                    <section className='main_section-usersChat'>
                        <div className="section-title_block-title">
                            <h1>Message</h1>
                        </div>
                        <div className='main_section_search-block'>
                            <input
                            type="text"
                            placeholder="🔍 Search player..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            />

                        </div>
                        <div className='section-usersChat_block'>
                        {usersChat
                            .map(chat => ({
                                ...chat,
                                Users: filterUsers(Array.isArray(chat.Users) ? chat.Users : [], searchTerm)
                            }))
                            .flatMap(chat => 
                                chat.Users.map(user => (
                                <div 
                                    key={`${chat.id}-${user.id}`} 
                                    onClick={() => {
                                    setChatId(chat.id); 
                                    setAvatar(user.avatar_url);
                                    setUsername(user.username);
                                    localStorage.setItem("chat_id", chat.id);
                                    }} 
                                    className={`section-usersChat_userBlock ${Number(chat.id) === Number(chat_id) ? 'active' : ''}`}
                                >
                                    <div className='section-usersChat_blockAvatar'>
                                    <img 
                                        className='section-usersChat_avatar' 
                                        src={user.avatar_url || ProfileIcon}
                                        style={{width:"50px" , height: "51px" , borderRadius: "30px"}}
                                        alt={`${user.username}'s avatar`}
                                        onError={(e) => {
                                        e.target.src = ProfileIcon;
                                        e.target.onerror = null;
                                        }}
                                    />
                                    <div   
                                        style={{ backgroundColor: user.status === "online" ? "green" : "grey" }} 
                                        className='section-usersChat_online'
                                    />
                                    </div>
                                    
                                    <div className='section-usersChat_infoUsers'> 
                                    <div className='section-usersChat_blockText'>
                                        <p>{user.username}</p>
                                        <p>{formatTime(chat.lastMessageTime)}</p> 
                                    </div>
                                    <div className='section-usersChat_blockText'>
                                        <p>{chat.lastMessage || "No messages"}</p>
                                        <p>1</p>
                                    </div>
                                    </div>
                                </div>
                                ))
                            )
                            }

                            {/* </div> */}
                        </div>
                    </section>
                    <section className='main_section-chat'>
                    <div className="section-title_block-profile-info">
                            <img
                                style={{width:"50px" ,  height: "51px" , borderRadius: "30px"}}
                                className='section-title_photo' src={avatar || ProfileIcon} alt="Profile Icon" />
                            <p className='section-title_userName'>{username}</p>
                            <div 
                                className='section-title_checker'
                                style={{
                                    backgroundColor: check == 200? "green" : "red"
                                }}
                            ></div>
                        </div>
                        
                        <div className='section-chat_block'>
                            <div className='section-chat_wrapper' >
                            {messages.map((msg, index) => {
                                
                                // console.log(`Message ${index}: sender_id =`, msg.sender_id, "userId =", userId);
                                return (
                                    <div key={index} className={msg.sender_id === userId ? "section-chat_block-info my-message" : "section-chat_block-info other-message"}>
                                        <div className='section-chat_block-text'>
                                            <div className='section-chat_content'>{msg.content}</div> 
                                            <div className='section-chat_date'>{formatTime(msg.createdAt)}</div>
                                        </div>
                                        <div ref={messagesEndRef} />
                                    </div>
                                );
                            })}
                            </div>
                            <div className='section-chat_block-button'>
                                <SendButton 
                                    message= {message}
                                    handleSendMessage ={handleSendMessage}
                                    setMessage = {setMessage}
                                />
                            </div>
                        </div>
                    </section>
                </div>
                
            </div>

            
        </div>
    );
}

export default ChatMain;





// import ProfileIcon from '../../img/icons/image 18.svg';
// import './ChatMain.css';
// import { useState, useEffect, useCallback } from 'react';
// import { getUserData } from '../../service/UserService.js';
// import { useNavigate } from 'react-router-dom';
// import SendButton from '../Buttons/SendButton.js'
// import { 
//     connectSocket, 
//     disconnectSocket, 
//     joinChat, 
//     leaveChat, 
//     sendMessage, 
//     onNewMessage,
//     createChat,
//     getMessagesAll,
//     getUsersAll,
//     getUserChats
// } from "../../service/webSocket.js";

// function ChatMain() {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');
//     const [userId, setUserId] = useState('');
//     const [usersChat, setUsersChat] = useState([]);
//     const [chat_id, setChatId] = useState(null);
//     const token = localStorage.getItem('token');
//     const [check, setCheck] = useState("");
//     const navigate = useNavigate();

//     // Функція для оновлення списку чатів
//     const updateChats = useCallback(async () => {
//         const response = await getUserChats();
//         const updatedChats = await Promise.all(response.map(async (chat) => {
//             const res = await getMessagesAll(chat.id);
//             const messages = res.messages;
//             const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

//             return {
//                 ...chat,
//                 lastMessage: lastMessage?.content || "Немає повідомлень",
//                 lastMessageTime: lastMessage?.createdAt || ""
//             };
//         }));
//         setUsersChat(updatedChats);
//     }, []);

//     // Ініціалізація чату
//     const initChat = useCallback(async (chatId) => {
//         try {
//             const userData = await getUserData();
//             setUserId(userData.id);

//             await connectSocket();
//             setCheck(200);

//             await joinChat(chatId);
//             const messagesResponse = await getMessagesAll(chatId);
//             if (messagesResponse.messages) {
//                 setMessages(messagesResponse.messages);
//             }

//             // Оновлюємо список чатів при ініціалізації
//             await updateChats();

//             // Обробник нових повідомлень
//             onNewMessage((newMessage) => {
//                 console.log("New message received:", newMessage);
                
//                 // Оновлюємо список повідомлень
//                 setMessages(prev => [...prev, newMessage]);
                
//                 // Оновлюємо список чатів
//                 setUsersChat(prevChats => 
//                     prevChats.map(chat => 
//                         chat.id === newMessage.chatId 
//                             ? { 
//                                 ...chat, 
//                                 lastMessage: newMessage.content,
//                                 lastMessageTime: newMessage.createdAt 
//                             } 
//                             : chat
//                     )
//                 );
//             });

//         } catch (error) {
//             console.error("Error initializing chat:", error);
//         }
//     }, [updateChats]);

//     useEffect(() => {
//         // Завантажуємо список чатів при монтуванні
//         updateChats();
        
//         // Отримуємо chat_id з localStorage
//         const savedChatId = localStorage.getItem("chat_id");
//         if (savedChatId) {
//             setChatId(savedChatId);
//             initChat(savedChatId);
//         }

//         return () => {
//             if (chat_id) {
//                 leaveChat(chat_id);
//             }
//             disconnectSocket();
//         };
//     }, [initChat, updateChats]);

//     const handleSendMessage = async () => {
//         if (message.trim() === '' || !userId || !chat_id) return;
        
//         try {
//             // Відправляємо повідомлення (припускаємо, що sendMessage повертає проміс)
//             await sendMessage(chat_id, message);
            
//             // Оновлюємо список чатів після успішного відправлення
//             await updateChats();
            
//             setMessage("");
//         } catch (error) {
//             console.error("Failed to send message:", error);
//         }
//     };

//     const handleChatSelect = (chatId) => {
//         // Залишаємо поточний чат перед приєднанням до нового
//         if (chat_id) {
//             leaveChat(chat_id);
//         }
        
//         setChatId(chatId);
//         localStorage.setItem("chat_id", chatId);
//         initChat(chatId);
//     };

//     return (
//         <div className="container-chat">
//             <div className="main">
//                 <section className="main_section-title">
//                     <div className='section-title_wrapper'> 
//                         <div className="section-title_block-title">
//                             <h1>Message</h1>
//                         </div>
//                         <div className="section-title_block-profile-info">
//                             <img className='section-title_photo' src={ProfileIcon} alt="Profile Icon" />
//                             <p className='section-title_userName'>Name</p>
//                             <div 
//                                 className='section-title_checker'
//                                 style={{
//                                     backgroundColor: check === 200 ? "green" : "red"
//                                 }}
//                             ></div>
//                         </div>
//                     </div>
//                 </section>
//                 <div className='container_chat'>
//                     <section className='main_section-usersChat'>
//                         <div className='section-usersChat_block'>
//                             <div className='section-usersChat_userBlock'>
//                                 {usersChat.map(chat => (
//                                     <div 
//                                         key={chat.id} 
//                                         onClick={() => handleChatSelect(chat.id)}
//                                         className='section-usersChat_infoUsers'
//                                     >
//                                         <div className='section-usersChat_blockAvatar'>
//                                             <img className='section-usersChat_avatar' src={ProfileIcon} alt="User avatar"/>
//                                             <div className='section-usersChat_online'></div>
//                                         </div>
//                                         {chat.Users.map(user => (
//                                             <div key={user.id}> 
//                                                 <div className='section-usersChat_blockText'>
//                                                     <p>userName - {user.username}</p>
//                                                     <p>id - {user.id}</p>
//                                                     <p>{new Date(chat.lastMessageTime).toLocaleTimeString()}</p>
//                                                 </div>
//                                                 <div className='section-usersChat_blockText'>
//                                                     <p>{chat.lastMessage}</p>
//                                                     {/* Тут можна додати лічильник непрочитаних */}
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </section>
//                     <section className='main_section-chat'>
//                         <div className='section-chat_block'>
//                             <div className='section-chat_wrapper'>
//                                 {messages.map((msg, index) => (
//                                     <div 
//                                         key={index} 
//                                         className={
//                                             msg.sender_id === userId 
//                                                 ? "section-chat_block-info my-message" 
//                                                 : "section-chat_block-info other-message"
//                                         }
//                                     >
//                                         <div className='section-chat_block-text'>
//                                             <div className='section-chat_content'>{msg.content}</div> 
//                                             <div className='section-chat_date'>
//                                                 {new Date(msg.createdAt).toLocaleTimeString()}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div className='section-chat_block-button'>
//                                 <SendButton 
//                                     message={message}
//                                     handleSendMessage={handleSendMessage}
//                                     setMessage={setMessage}
//                                 />
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ChatMain;