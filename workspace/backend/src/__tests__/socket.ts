import { Server } from 'socket.io';
jest.mock('socket.io');

import Socket from '../socket';

describe('socket', () => {
  it('should be frontend', () => {
    const s = new Server();
    const socket = new Socket(s);
    s.emit('connection', { handshake: { query: { type: 'frontend' } } });
    expect(socket.frontend).toBeDefined();
  });
});
