import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

let socket = null

export const connectSocket = (token) => {
  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Socket Connected", socket.id);
  });
   
  socket.on("disconnect", () => {
    console.log("Socket Disconnected");
  });

  return socket;
};


export const getSocket = () => socket;