import { config } from 'dotenv';
import { createConfig, createServer } from 'express-zod-api';
import { Server } from 'socket.io';

import Alarm from './Alarm';
import Routing from './routes';
import SocketIO from './socket';

config();

const zodConfig = createConfig({
  cors: true,
  logger: {
    level: 'debug',
    color: true
  },
  server: {
    upload: true,
    listen: process.env.PORT || 8080
  },
  startupLogo: false
});

const { httpServer } = createServer(zodConfig, Routing);

export const socketIO = new SocketIO(new Server(httpServer, { cors: { origin: '*' } }));

const alarm = new Alarm();

export const stopServer = () => {
  alarm.stop();
  return new Promise<true>((res, rej) => {
    httpServer.close((err) => {
      if (err) {
        rej(err);
      }
      res(true);
    });
  });
};
