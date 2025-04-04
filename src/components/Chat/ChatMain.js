// import ProfileIcon from '../../img/icons/image 18.svg';
// import './ChatMain.css';
// import { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import { getUserData } from '../../service/UserService.js';
// import { fetchRequest } from '../../service/FetchRequest.js';
// import { useNavigate } from 'react-router-dom';

// import { 
//     connectSocket, 
//     disconnectSocket, 
//     joinChat, 
//     leaveChat, 
//     sendMessage, 
//     onNewMessage,
//     createChat
//   } from "../../service/webSSocket.js";

// function ChatMain() {
//     const [mess , setMess] = useState('name')
//     const [messages, setMessages] = useState([]);
//     const token = localStorage.getItem('token')
//     const chat_id = 3
//     const [userId , setUserId] = useState('')
//     const navigate = useNavigate()

//     useEffect(() => {
//         getUserData().then(response => {console.log(response) ; setUserId(response.id) })
//         fetch(`http://localhost:5001/api/chats/${chat_id}/messages`, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.messages) {
//                 console.log(data.messages)
//                 setMessages(data.messages);
//             }
//         })
//         .catch(error => console.error("Error fetching messages:", error));
//     }, []);

//   useEffect(() => {


//     // Підключаємо WebSocket
//     connectSocket(token);
//     joinChat(chat_id);

//     // Отримуємо нові повідомлення
//     onNewMessage((newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       console.log(messages)
//     });

//     return () => {
//       leaveChat(chat_id);
//       disconnectSocket();
//     };
//   }, [chat_id, token]);

//   const handleSendMessage = () => {
//     sendMessage(chat_id, mess); 
//     console.log('+')
//   };
//   const handleCreateChat =()=>  {
//     const recipientId = 6; 
    
//     try {
//         const chat =  createChat(recipientId, token);
//         console.log("Chat created:", chat);
//     } catch (error) {
//         console.error("Failed to create chat", error);
//     }
//     };
//     return (
//         <div className="container-chat">
            
//             <div className="main">
//                 <div className="main_section-title">
//                     <div className='section-title_wrapper'> 
//                         <div className="section-title_block-title">
//                             <h1>Message</h1>
//                         </div>
//                         <div className="section-title_block-profile-info">
//                             <img src={ProfileIcon} alt="Profile Icon" />
//                             <p>Name</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='main_section-chat'>
//                     <div className='section-chat_block-recipient'>
//                         <div className='section-chat_wrapper'>
//                             <img src={ProfileIcon} alt="Profile Icon" />
//                             <div className='section-chat_block-text'>
//                                 <p className='section-chat_name-recipient'>Max</p>
//                                 <p className='section-chat_text-recipient'>hello world</p>
//                             </div>
//                             <p className='section-chat_date'>23:15</p>
//                         </div>
//                     </div>
//                     <div className='section-chat_block-recipient flex'>
//                         <div className='section-chat_wrapper'>
//                             {messages.map((msg, index) => (
//                                 <div
//                                     key={index}
//                                     className={msg.senderId === userId ? "my-message" : "other-message"}
//                                 >
                                    
//                                     {
//                                         msg.sender_id === userId ?
//                                         <div className='section-chat_block-text'>
                                     
//                                             <p className='section-chat_name-recipient'>Max</p>
//                                             <p>{msg.content}</p> 
//                                             <p className='section-chat_date'>23:15</p>
//                                         </div>
//                                         : 
//                                             <p>00</p>

                                        
//                                     }
//                                 </div>
//                             ))}
                           
                            
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div>
//                 <input 
//                     value={mess}
//                     onChange={(e)=> setMess(e.target.value)}
//                 ></input>
//                 <button onClick={handleSendMessage}>Send Message</button>
//                 <button onClick={handleCreateChat}>Create Chat</button>
//             </div>
//         </div>
//     );
// }

// export default ChatMain;

// import ProfileIcon from '../../img/icons/image 18.svg';
// import './ChatMain.css';
// import { useState, useEffect } from 'react';
// import { getUserData } from '../../service/UserService.js';
// import { useNavigate } from 'react-router-dom';
// import {getUserId} from "../../service/StorageService.js"
// import { 
//     connectSocket, 
//     disconnectSocket, 
//     joinChat, 
//     leaveChat, 
//     sendMessage, 
//     onNewMessage,
//     createChat,
//     getMessagesAll
// } from "../../service/webSSocket.js";

// function ChatMain() {
//     const [messages, setMessages] = useState([]);
//     const [message, setMessage] = useState('');
//     const [userId, setUserId] = useState('');
//     const token = localStorage.getItem('token');
//     const chat_id = 1;
//     const navigate = useNavigate();
//     useEffect(() => {
//         getUserData().then(response => setUserId(response.id))
//     }, []);

//     useEffect(() => {
//         getMessagesAll(chat_id).then(response => console.log(response))
//         fetch(`http://localhost:5001/api/chats/${chat_id}/messages`, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.messages) {
//                 console.log("Fetched Messages:", data.messages);
//                 setMessages(data.messages);
//             }
//         })
//         .catch(error => console.error("Error fetching messages:", error));
//     }, [chat_id, token]);

//     useEffect(() => {
//         connectSocket(token);
//         joinChat(chat_id);

//         onNewMessage((newMessage) => {
//             console.log("New message received:", newMessage);
//             if (newMessage.senderId !== userId) {
//                 setMessages(prevMessages => [...prevMessages, newMessage]);
//             }
//         });

//         return () => {
//             leaveChat(chat_id);
//             disconnectSocket();
//         };
//     }, []);

//     // Відправлення нового повідомлення
//     // const handleSendMessage = () => {
//     //     if (message.trim() === '') return;
//     //     sendMessage(chat_id, message);
//     //     setMessage(""); // Очищаємо інпут після відправки
//     // };
//     const handleSendMessage = () => {
//         if (message.trim() === '') return;
    
        
    
//         sendMessage(chat_id, message);
    
//         setMessages(prevMessages => [...prevMessages, message]);
    
//         setMessage("");
//     };
    
    
    

//     const handleCreateChat = () => {
//         const recipientId = 1;
//         createChat(recipientId, token)
//             .then(chat => console.log("Chat created:", chat))
//             .catch(error => console.error("Failed to create chat", error));
//     };

//     return (
//         <div className="container-chat">
//             <div className="main">
//                 <div className="main_section-title">
//                     <div className='section-title_wrapper'> 
//                         <div className="section-title_block-title">
//                             <h1>Message</h1>
//                         </div>
//                         <div className="section-title_block-profile-info">
//                             <img src={ProfileIcon} alt="Profile Icon" />
//                             <p>Name</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='main_section-chat'>
//                     <div className='section-chat_block-recipient'>
//                         <div className='section-chat_wrapper'>
//                             {messages.map((msg, index) => (
                                
//                                 <div key={index} className={msg.sender_id === userId ? "my-message" : "other-message"}>
//                                     <div className='section-chat_block-text'>
//                                         <p className='section-chat_name-recipient'>{msg.sender_id === userId ? "You" : "Recipient"}</p>
//                                         <p>{msg.content}</p> 
//                                         <p>{msg.sender_id}</p> 
//                                         <p className='section-chat_date'>{new Date(msg.createdAt).toLocaleTimeString()}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div>
//                 <input 
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type a message..."
//                 />
//                 <button onClick={handleSendMessage}>Send Message</button>
//                 <button onClick={handleCreateChat}>Create Chat</button>
//             </div>
//         </div>
//     );
// }

// export default ChatMain;



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
    getMessagesAll
} from "../../service/webSSocket.js";
function ChatMain() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const token = localStorage.getItem('token');
    const [check , setCheck] = useState("")
    const chat_id = 20;
    const navigate = useNavigate();
    // useEffect(()=>{
    //     const recipientId = 3;
    //     createChat(recipientId, token)
    //         .then(chat => console.log("Chat created:", chat))
    //         .catch(error => console.error("Failed to create chat", error));
    // },[])
   

    // useEffect(() => {
    //     getUserData().then(response => setUserId(response.id))
    //     connectSocket()
    //     .then(response => {
    //         if(response == 200){
    //             setCheck(200)
    //         } })
            
    //     joinChat(chat_id);
    //     getMessagesAll(chat_id)
    //     .then(response => {
    //         console.log(response.messages)
    //         if(response.messages)
    //         setMessages(response.messages)
    //     }).catch(error => {throw error})
    //     return () => {
    //         leaveChat(chat_id);
    //         disconnectSocket();
    //     };
    // }, []); 

    useEffect(() => {
        getUserData().then(response => setUserId(response.id));
    
        connectSocket()
            .then(response => {
                if (response === 200) {
                    setCheck(200);
                }
            });
    
        joinChat(chat_id);
    
        getMessagesAll(chat_id)
            .then(response => {
                if (response.messages) setMessages(response.messages);
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
    
        return () => {
            leaveChat(chat_id);
            disconnectSocket();
        };
    }, []);
    
 
    // const handleSendMessage = () => {
    //     if (message.trim() === '') return; 
        
    //     if (!userId) {
    //         console.error("User ID is missing.");
    //         return;
    //     }
    
    //     const newMessage = {
    //         chat_id,
    //         content: message,
    //         sender_id: userId, 
    //         createdAt: new Date().toISOString(),
    //     };

    //     console.log("Sending message:", newMessage);
    //     // setMessages(prevMessages => [...prevMessages, newMessage]);
    
    //     sendMessage(chat_id, message);
    
    //     setMessage(""); 
    // };
    const handleSendMessage = () => {
        if (message.trim() === '') return; 
        if (!userId) return console.error("User ID is missing.");
    
        sendMessage(chat_id, message); // Відправляємо повідомлення на сервер
        setMessage("");  // Очищаємо поле вводу
    };
    
    
    
    
    

    const handleCreateChat = () => {
        const recipientId = 5;
        createChat(recipientId, token)
            .then(chat => console.log("Chat created:", chat))
            .catch(error => console.error("Failed to create chat", error));
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

                <section className='main_section-chat'>
                    <div className='section-chat_block'>
                        <div className='section-chat_wrapper'>
                        {messages.map((msg, index) => {
                            
                            // console.log(`Message ${index}: sender_id =`, msg.sender_id, "userId =", userId);
                            return (
                                <div key={index} className={msg.senderId === userId ? "section-chat_block-info my-message" : "section-chat_block-info other-message"}>
                                    <div className='section-chat_block-text'>
                                        <div className='section-chat_content'>{msg.content}</div> 
                                        <div className='section-chat_content'>{msg.senderId}</div> 
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
                        <button onClick={()=>handleCreateChat()}>create</button>
                    </div>
                </section>
            </div>

            
        </div>
    );
}

export default ChatMain;