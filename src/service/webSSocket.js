import { API_URL, fetchRequest } from "./FetchRequest";
import { getAccessToken } from "./StorageService";



import { io } from "socket.io-client";
import axios from "axios";
let socket = null;

export const getUserData = async () => {
  console.log("GET Request to:", `${API_URL}/api/users/me`);

  try {
    const response = await fetchRequest.get(`${API_URL}/api/users/me`);
    console.log("API Response (getUserData):", response.data);
    return response.data;
  } catch (error) {
    console.error("API Error (getUserData):", error.response);
    return error.response;
  }
};

export const connectSocket = () => {
  return new Promise ((resolve ,reject) => {
    socket = io(API_URL, {
      query: { token: getAccessToken() },
    });
  
  
    socket.on("connect", (e) => {
      console.log("Connected to WebSocket server");
      resolve(socket)
    });
  
    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });
  
    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });
  })
  
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinChat = (chat_id) => {
  if (socket) {
    socket.emit("joinChat", { chat_id });
  }
};

export const leaveChat = (chat_id) => {
  if (socket) {
    socket.emit("leaveChat", { chat_id });
  }
};

export const sendMessage = (chat_id, content) => {
  if (socket) {
    socket.emit("sendMessage", { chat_id, content });

  }
};

export const onNewMessage = (callback) => {
  if (socket) {
      socket.on("newMessage", (newMessage) => {
          console.log("Received new message:", newMessage);
          if (callback) callback(newMessage); 
      });
  }
};



//http://localhost:5001/api/chats/${chat_id}/messages
export const getMessagesAll = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/api/chats/${chatId}/messages`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting messages:", error.response?.data || error.message);
    throw error;
  }
};
export const createChat = async (recipientId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/chats/create`,
      { recipientId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error.response?.data || error.message);
    throw error;
  }
};