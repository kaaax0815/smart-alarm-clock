import { Router } from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';

const router = Router();

router.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: true
  })
);

export default router;
