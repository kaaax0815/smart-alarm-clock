import { Request, Response } from 'express';

import db from '../database';

function settings(req: Request, res: Response) {
  const locale = req.body.locale;
  const timezone = req.body.timezone;
  const location = req.body.location;
  locale && db.push('/locale', locale);
  timezone && db.push('/timezone', timezone);
  location && db.push('/location', location);
  res.json({ status: 'success' });
}

export default settings;
