import { Server } from 'socket.io';

import db from './database';
import { updateValue } from './Models/updateOrGetValue';

export default function socketIO(io: Server) {
  io.on('connection', (socket) => {
    socket.on('update-value', (data: updateValue) => {
      const type = data.type;
      const value = data.value;
      if (value === undefined) {
        return;
      }
      switch (type) {
        case 'locale':
          db.push('/locale', value);
          break;
        case 'timezone':
          db.push('/timezone', value);
          break;
      }
    });
  });
}
