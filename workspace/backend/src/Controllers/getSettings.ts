import db from '../database';
import { getSettingsResponse, Request, Response } from '../Models';

function getSettings(req: Request, res: Response<getSettingsResponse>) {
  const timezone = db.getData('/timezone');
  const location = db.getData('/location');
  res.json({ timezone, location });
}

export default getSettings;
