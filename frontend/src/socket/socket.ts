import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  autoConnect: false,
});

export function connectSocket(token: string) {
  socket.auth = { token };
  socket.connect();
}