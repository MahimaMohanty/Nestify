import { io } from "socket.io-client";

// Connect frontend to backend Socket.IO server
export const socket = io("http://localhost:4000", {
  transports: ["websocket"],
  autoConnect: true,
});
