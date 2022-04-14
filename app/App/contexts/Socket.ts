import {createContext} from 'react';
import socketio from 'socket.io-client';

export const socket = socketio('http://localhost:3535', {
  query: {type: 'client'},
});

export const socketContext = createContext(socket);
