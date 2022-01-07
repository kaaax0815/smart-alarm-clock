import { createContext } from 'react';
import socketio from 'socket.io-client';

export const socket = socketio(`http://localhost:${process.env.REACT_APP_BACKEND_PORT}`);
export const SocketContext = createContext(socket);
