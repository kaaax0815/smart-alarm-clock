import { createContext } from 'react';
import socketio from 'socket.io-client';

export const socket = socketio(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}`);
export const SocketContext = createContext(socket);
