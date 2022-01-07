import { Request, Response } from 'express';

import db from '../database';

function settings(req: Request, res: Response) {
  const locale = req.body.locale;
  const timezone = req.body.timezone;
  const location = req.body.location;
  db.push('/locale', locale);
  db.push('/timezone', timezone);
  db.push('/location', location);
  res.json({ status: 'success' });
}

export default settings;
