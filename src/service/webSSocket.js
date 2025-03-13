// import { io } from "socket.io-client";

// const SOCKET_URL = "http://localhost:5001"; // Замініть на ваш сервер
// const token =  localStorage.getItem('token')
// class SocketService {
//   constructor() {
//     this.socket = null;
//   }

//   connect(token) {
//     this.socket = io(SOCKET_URL, {
//       query: { token },
//     });

//     this.socket.on("connect", () => {
//       console.log("Connected to WebSocket server");
//     });

//     this.socket.on("disconnect", () => {
//       console.log("Disconnected from WebSocket server");
//     });

//     this.socket.on("connect_error", (err) => {
//       console.error("WebSocket connection error:", err);
//     });
//   }

//   onNewMessage(callback) {
//     if (!this.socket) return;
//     this.socket.on("newMessage", (newMessage) => {
//       callback(newMessage);
//     });
//   }

//   sendMessage(chat_id, content) {
//     if (!this.socket) return;
//     this.socket.emit("sendMessage", { chat_id, content });
//   }

//   joinChat(chat_id) {
//     if (!this.socket) return;
//     this.socket.emit("joinChat", { chat_id });
//   }

//   leaveChat(chat_id) {
//     if (!this.socket) return;
//     this.socket.emit("leaveChat", { chat_id });
//   }

//   disconnect() {
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket = null;
//     }
//   }
// }

// const socketService = new SocketService();
// export default socketService;


import { io } from "socket.io-client";
import axios from "axios";
let socket = null;
const API_URL = "http://localhost:5001/api/chats/create"; 

export const connectSocket = (token) => {
  socket = io("http://localhost:5001", {
    query: { token },
  });

  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
  });

  socket.on("connect_error", (err) => {
    console.error("WebSocket connection error:", err);
  });
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
      callback(newMessage);
    });
  }
};


export const createChat = async (recipientId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}`,
      { recipientId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating chat:", error.response?.data || error.message);
    throw error;
  }
};