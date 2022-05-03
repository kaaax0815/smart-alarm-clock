import { createContext } from 'react';
import socketio from 'socket.io-client';

interface Socket {
  loading: boolean;
  socket: ReturnType<typeof socketio> | undefined;
}

export const SocketContext = createContext<Socket>({
  loading: true,
  socket: undefined,
});
