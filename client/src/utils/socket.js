import { io } from "socket.io-client";

const socket = io("https://poll-backend-idy1.onrender.com", {
  transports: ["websocket"],
  withCredentials: false,
});

socket.on("connect", () => {
  console.log("Frontend connected:", socket.id);
});

export default socket;
