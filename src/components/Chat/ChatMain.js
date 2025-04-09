

import ProfileIcon from '../../img/icons/image 18.svg';
import './ChatMain.css';
import { useState, useEffect } from 'react';
import { getUserData } from '../../service/UserService.js';
import { useNavigate } from 'react-router-dom';
import SendButton from '../Buttons/SendButton.js'
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
    const [usersChat, setUsersChat] = useState([]);
    const [chat_id, setChatId] = useState(null);
    const token = localStorage.getItem('token');
    const [check , setCheck] = useState("")
    const [lastMessage , setLastMessage] = useState('')
    // const chat_id = 28
    const navigate = useNavigate();
 
   

    useEffect(() => {
        
        const chat_id = localStorage.getItem("chat_id")
        if (!chat_id) return 
        setChatId(chat_id)
        console.log(chat_id , "true")
        initChat(chat_id)
        
      
        return () => {
            leaveChat(chat_id);
            disconnectSocket();
        };

    }, [chat_id]);

    const initChat = (chat_id) => {
        getUserData().then(response => setUserId(response.id));
        console.log("id ----" , userId)
            getUsersAll(chat_id)
            getUserChats().then(response => {
                setUsersChat(response)
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
                        setLastMessage(response.messages.length - 1)
                    }
                })
                .catch(error => console.error("Error fetching messages:", error));
            
            const handleNewMessage = (newMessage) => {
                console.log("New message received:", newMessage);
        
                // Оновлюємо стан через функціональний підхід
                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages, newMessage];
                    console.log("Updated messages:", updatedMessages); 
                    return updatedMessages;
                });
             };
        
            onNewMessage(handleNewMessage);
        
            
    }
    // useEffect(() => {
    //     const chat_id = localStorage.getItem("chat_id");
    //     if (!chat_id) return;
    
    //     setChatId(chat_id);
    //     initChat(chat_id);
    
    //     return () => {
    //         leaveChat(chat_id);
    //         disconnectSocket();
    //     };
    // }, []);
    
    // const initChat = async (id) => {
    //     try {
    //         console.log("initChat with chatId:", id);
    
    //         const user = await getUserData();
    //         setUserId(user.id);
    
    //         await getUsersAll(id);
    //         await getUserChats();
    
    //         const connectionStatus = await connectSocket();
    //         if (connectionStatus === 200) {
    //             setCheck(200);
    //         }
    
    //         joinChat(id);
    
    //         const response = await getMessagesAll(id);
    //         if (response.messages) setMessages(response.messages);
    
    //         onNewMessage((newMessage) => {
    //             console.log("New message received:", newMessage);
    //             setMessages(prev => [...prev, newMessage]);
    //         });
    
    //     } catch (error) {
    //         console.error("Error initializing chat:", error);
    //     }
    // };
    
    
 
 
    const handleSendMessage = () => {
        if (message.trim() === '') return; 
        if (!userId) return console.error("User ID is missing.");
    
        sendMessage(chat_id, message); // Відправляємо повідомлення на сервер
        setMessage("");  // Очищаємо поле вводу
        console.log("+")
    };
    
    
    
    return (
        <div className="container-chat">
            <div className="main">
                <section className="main_section-title">
                    <div className='section-title_wrapper'> 
                        <div className="section-title_block-title">
                            <h1>Message</h1>
                        </div>
                        <div className="section-title_block-profile-info">
                            <img className='section-title_photo' src={ProfileIcon} alt="Profile Icon" />
                            <p className='section-title_userName'>Name</p>
                            <div 
                                className='section-title_checker'
                                style={{
                                    backgroundColor: check == 200? "green" : "red"
                                }}
                            ></div>
                        </div>
                    </div>
                </section>
                <div className='container_chat'>
                    <section className='main_section-usersChat'>
                        <div className='section-usersChat_block'>
                            <div  className='section-usersChat_userBlock'>
                                {/* <div className='section-usersChat_blockAvatar'>
                                    <img className='section-usersChat_avatar' src={ProfileIcon}/>
                                    <div className='section-usersChat_online'></div>
                                </div> */}
                                {/* {
                                    usersChat.map((data) => {
                                        {data.Users.map(data => {
                                            console.log( data.id , data.username)
                                            return (
                                                <div className='section-usersChat_infoUsers'>
                                                    <div className='section-usersChat_blockText'>
                                                        <p>userName - {data.username}</p>
                                                        <p>id - {data.id}</p>
                                                        <p>4.20pm</p>
                                                    </div>
                                                    <div className='section-usersChat_blockText'>
                                                        <p>ldfdkfndkfmkd</p>
                                                        <p>1</p>
                                                    </div>
                                                </div>
                                            )
                                              
                                            
                                        })}
                                    })
                                } */}
                                {usersChat.map(chat => (
                                    <div key={chat.id} onClick={() => {setChatId(chat.id); localStorage.setItem("chat_id" , chat.id)}} className='section-usersChat_infoUsers'>
                                        <div className='section-usersChat_blockAvatar'>
                                            <img className='section-usersChat_avatar' src={ProfileIcon}/>
                                            <div className='section-usersChat_online'></div>
                                        </div>
                                        {chat.Users.map(user => (
                                            <div key={user.id} className='section-usersChat_blockText'>
                                                <p>userName - {user.username}</p>
                                                <p>id - {user.id}</p>
                                                <p>4.20pm</p>
                                            </div>
                                        ))}
                                        <div className='section-usersChat_blockText'>
                                            <p>{lastMessage}</p>
                                            <p>1</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className='main_section-chat'>
                        <div className='section-chat_block'>
                            <div className='section-chat_wrapper'>
                            {messages.map((msg, index) => {
                                
                                // console.log(`Message ${index}: sender_id =`, msg.sender_id, "userId =", userId);
                                return (
                                    <div key={index} className={msg.sender_id === userId ? "section-chat_block-info my-message" : "section-chat_block-info other-message"}>
                                        <div className='section-chat_block-text'>
                                            <div className='section-chat_content'>{msg.content}</div> 
                                            <div className='section-chat_content'>{msg.sender_id}</div> 
                                            <div className='section-chat_date'>{new Date(msg.createdAt).toLocaleTimeString()}</div>
                                        </div>
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