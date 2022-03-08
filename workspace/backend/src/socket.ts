import { Server, Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import socketAuth from './Middlewares/socketAuth';
class SocketIO {
  server: Server;
  sockets: Socket[] = [];
  constructor(server: Server) {
    this.server = server;
    this.server.use(socketAuth);
    this.server.on('connection', (socket: Socket) => {
      this.sockets.push(socket);
      console.log(`CONNECT ${socket.id} ${socket.handshake.address}`);
      socket.on('disconnect', () => {
        this.sockets = this.sockets.filter((s) => s.id !== socket.id);
        console.log(`DISCONNECT ${socket.id} ${socket.handshake.address}`);
      });
    });
  }
}

export type MiddlewareSocket =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export type MiddlewareNext = (err?: ExtendedError | undefined) => void;

export default SocketIO;
