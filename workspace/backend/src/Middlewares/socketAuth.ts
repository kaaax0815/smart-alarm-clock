import { JWT } from '../index';
import { MiddlewareNext, MiddlewareSocket } from '../socket';

function socketAuth(socket: MiddlewareSocket, next: MiddlewareNext) {
  if (
    socket.handshake.address === '127.0.0.1' ||
    socket.handshake.address === '::1' ||
    socket.handshake.address === '::ffff:127.0.0.1'
  ) {
    return next();
  }
  const token = socket.handshake.auth.token?.toString();
  if (!token) {
    socket.disconnect(true);
    return next(new Error('No token provided'));
  }
  try {
    JWT.verify(token);
    return next();
  } catch (error) {
    socket.disconnect(true);
    return next(new Error('Invalid token'));
  }
}

export default socketAuth;
