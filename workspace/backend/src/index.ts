import cors from 'cors';
import { config } from 'dotenv';
import Express from 'express';
import helmet from 'helmet';
import { Server } from 'socket.io';

import logger from './logger';
import Routes from './routes';
import socket from './socket';
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

const server = app.listen(process.env.PORT || 8080, () => {
  console.log('Server is running');
});

socket(
  new Server(server, {
    cors: {
      origin
    }
  })
);
