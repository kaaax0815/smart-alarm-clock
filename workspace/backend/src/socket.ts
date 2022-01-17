import { Server, Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import socketAuth from './Middlewares/socketAuth';

function socketIO(io: Server) {
  io.use(socketAuth);
  io.on('connection', () => {
    // do nothing for now
  });
}

export type MiddlewareSocket =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

export type MiddlewareNext = (err?: ExtendedError | undefined) => void;

export default socketIO;
