import { Request, Response } from 'express';

import db from '../database';

function getSettings(_req: Request, res: Response) {
  const locale = db.getData('/locale');
  const timezone = db.getData('/timezone');
  const location = db.getData('/location');
  res.json({ locale, timezone, location });
}

export default getSettings;
