import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],  
  withCredentials: false,
});

socket.on("connect", () => {
  console.log("Frontend connected:", socket.id);
});

export default socket;
