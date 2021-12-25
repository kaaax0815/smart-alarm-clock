import { NextFunction, Request, Response } from 'express';

import { JWT } from '../index';

function token(req: Request, res: Response, next: NextFunction) {
  if (req.socket.remoteAddress === '127.0.0.1' || req.socket.remoteAddress === '::1') {
    return next();
  }
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      error: 'No token provided'
    });
  }
  try {
    JWT.verify(token);
    return next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
}

export default token;
