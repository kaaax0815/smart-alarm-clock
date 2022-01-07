import { Server } from 'socket.io';

export default function socketIO(io: Server) {
  io.on('connection', () => {
    // do nothing for now
  });
}
