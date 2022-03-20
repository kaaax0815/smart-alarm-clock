import cors from 'cors';
import { config } from 'dotenv';
import Express from 'express';
import helmet from 'helmet';
import { join } from 'path';
import { Server } from 'socket.io';

import logger from './logger';
import Routes from './routes';
import SocketIO from './socket';
import jwt from './token';
export const JWT = new jwt();

config();

const app = Express();

const origin = /http:\/\/localhost/;

app.use(helmet());

app.use(
  cors({
    origin
  })
);

app.use(logger);

app.use(Express.json());

app.use('/api/', Routes);

app.use('/ringtones', Express.static(join(__dirname, '../Ringtones')));

const server = app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running');
});

export const socketIO = new SocketIO(
  new Server(server, {
    cors: {
      origin
    }
  })
);
