import { NextFunction, Request, Response } from 'express';

export default function test(req: Request, res: Response, next: NextFunction) {
  if (req.query.test !== 'test') {
    next();
  }
}
