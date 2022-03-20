import db from '../database';
import { getSettingsResponse, Request, Response } from '../Models';

function getSettings(req: Request, res: Response<getSettingsResponse>) {
  const settings = db.getData('/settings');
  res.json(settings);
}

export default getSettings;
