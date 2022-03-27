import { Server, Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import socketAuth from './Middlewares/socketAuth';
class SocketIO {
  server: Server;
  clients: Socket[] = [];
  private _frontend: Socket[] = [];
  constructor(server: Server) {
    this.server = server;
    this.server.use(socketAuth);
    this.server.on('connection', (socket: Socket) => {
      if (socket.handshake.query.type === 'frontend') {
        this._frontend.push(socket);
      } else if (socket.handshake.query.type === 'client') {
        this.clients.push(socket);
      }
      console.log(
        `CONNECT ${socket.id} ${socket.handshake.address} ${socket.handshake.query.type}`
      );
      socket.on('disconnect', () => {
        if (socket.handshake.query.type === 'frontend') {
          this._frontend = [];
        } else if (socket.handshake.query.type === 'client') {
          this.clients = this.clients.filter((s) => s.id !== socket.id);
        }

        console.log(
          `DISCONNECT ${socket.id} ${socket.handshake.address} ${socket.handshake.query.type}`
        );
      });
    });
  }

  emitFrontend(ev: string, ...args: ArgsType) {
    this.frontend?.emit(ev, ...args);
  }

  emitClient(ev: string, ...args: ArgsType) {
    this.clients.forEach((client) => client.emit(ev, ...args));
  }

  emitAll(ev: string, ...args: ArgsType) {
    this.emitClient(ev, ...args);
    this.emitFrontend(ev, ...args);
  }

  get frontend() {
    return this._frontend[0];
  }
}

export type MiddlewareSocket =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export type MiddlewareNext = (err?: ExtendedError | undefined) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ArgsType = any[];

export default SocketIO;
