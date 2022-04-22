import { createContext } from 'react';
import socketio from 'socket.io-client';

export const socket = socketio('http://10.0.2.2:3535', {
  query: { type: 'client' },
});

export const SocketContext = createContext(socket);
