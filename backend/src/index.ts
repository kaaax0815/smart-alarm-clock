import cors from 'cors';
import { config } from 'dotenv';
import Express from 'express';
import helmet from 'helmet';
import { Server } from 'socket.io';

import logger from './logger';
import Routes from './routes';
import socket from './socket';

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

app.use('/', Routes);

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
