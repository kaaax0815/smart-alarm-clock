import { createContext } from 'react';
import socketio from 'socket.io-client';

export const socket = socketio(`localhost:${process.env.SOCKETIO_PORT}`);
export const SocketContext = createContext(socket);
