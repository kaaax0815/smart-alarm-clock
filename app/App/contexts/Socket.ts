import { createContext } from 'react';
import socketio from 'socket.io-client';

type Socket = ReturnType<typeof socketio> | undefined;

export const SocketContext = createContext<Socket>(undefined);
