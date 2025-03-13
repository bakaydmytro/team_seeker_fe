import ProfileIcon from '../../img/icons/image 18.svg';
import './ChatMain.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { getUserData } from '../../service/apiService.js';
import { setupAxiosInterceptors } from '../../service/axiosService.js';
import { useNavigate } from 'react-router-dom';

import { 
    connectSocket, 
    disconnectSocket, 
    joinChat, 
    leaveChat, 
    sendMessage, 
    onNewMessage,
    createChat
  } from "../../service/webSSocket.js";

function ChatMain() {
    const [mess , setMess] = useState('name')
    const [messages, setMessages] = useState([]);
    const token = localStorage.getItem('token')
    const chat_id = 3
    const [userId , setUserId] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        setupAxiosInterceptors(navigate)
        getUserData().then(response => {console.log(response) ; setUserId(response.data.id) })
        fetch(`http://localhost:5001/api/chats/${chat_id}/messages`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.messages) {
                console.log(data.messages)
                setMessages(data.messages);
            }
        })
        .catch(error => console.error("Error fetching messages:", error));
    }, []);

  useEffect(() => {


    // Підключаємо WebSocket
    connectSocket(token);
    joinChat(chat_id);

    // Отримуємо нові повідомлення
    onNewMessage((newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log(messages)
    });

    return () => {
      leaveChat(chat_id);
      disconnectSocket();
    };
  }, [chat_id, token]);

  const handleSendMessage = () => {
    sendMessage(chat_id, mess); 
    console.log('+')
  };
  const handleCreateChat =()=>  {
    const recipientId = 6; 
    
    try {
        const chat =  createChat(recipientId, token);
        console.log("Chat created:", chat);
    } catch (error) {
        console.error("Failed to create chat", error);
    }
    };
    return (
        <div className="container-chat">
            
            <div className="main">
                <div className="main_section-title">
                    <div className='section-title_wrapper'> 
                        <div className="section-title_block-title">
                            <h1>Message</h1>
                        </div>
                        <div className="section-title_block-profile-info">
                            <img src={ProfileIcon} alt="Profile Icon" />
                            <p>Name</p>
                        </div>
                    </div>
                </div>
                <div className='main_section-chat'>
                    <div className='section-chat_block-recipient'>
                        <div className='section-chat_wrapper'>
                            <img src={ProfileIcon} alt="Profile Icon" />
                            <div className='section-chat_block-text'>
                                <p className='section-chat_name-recipient'>Max</p>
                                <p className='section-chat_text-recipient'>hello world</p>
                            </div>
                            <p className='section-chat_date'>23:15</p>
                        </div>
                    </div>
                    <div className='section-chat_block-recipient flex'>
                        <div className='section-chat_wrapper'>
                            <div className='section-chat_block-text'>
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={msg.senderId === userId ? "my-message" : "other-message"}
                                >
                                    
                                    {
                                        msg.sender_id === userId ?
                                        <p>{msg.content}</p> : <p>00</p>
                                    }
                                </div>
                            ))}
                                <p className='section-chat_name-recipient'>Max</p>
                                <p className='section-chat_text-recipient'>hello world</p>
                            </div>
                            <p className='section-chat_date'>23:15</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <input 
                    value={mess}
                    onChange={(e)=> setMess(e.target.value)}
                ></input>
                <button onClick={handleSendMessage}>Send Message</button>
                <button onClick={handleCreateChat}>Create Chat</button>
            </div>
        </div>
    );
}

export default ChatMain;
