import { createContext } from 'react';
import socketio from 'socket.io-client';

export const socket = socketio(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}`, {
  query: { type: 'frontend' }
});
export const SocketContext = createContext(socket);
