import { config } from 'dotenv';
import Express from 'express';

import Routes from './routes';

config();

const app = Express();

const port = process.env.PORT || 3000;

app.use('/', Routes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
