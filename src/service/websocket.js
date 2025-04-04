import { io } from "socket.io-client";

const socket = io("http://localhost:5001", {
  query: { token: localStorage.getItem("token") }, 
  autoConnect: false, 
});

export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const joinChat = (chatId) => {
  socket.emit("joinChat", { chat_id: chatId });
};

export const sendMessage = (chatId, content) => {
  socket.emit("sendMessage", { chat_id: chatId, content });
};

export const leaveChat = (chatId) => {
  socket.emit("leaveChat", { chat_id: chatId });
};

export const subscribeToMessages = (callback) => {
  socket.on("newMessage", callback);
};

export default socket;
