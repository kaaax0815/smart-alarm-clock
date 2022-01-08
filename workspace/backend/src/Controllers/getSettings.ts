import db from '../database';
import { getSettingsResponse, Request, Response } from '../Models';

function getSettings(req: Request, res: Response<getSettingsResponse>) {
  const locale = db.getData('/locale');
  const timezone = db.getData('/timezone');
  const location = db.getData('/location');
  res.json({ locale, timezone, location });
}

export default getSettings;
