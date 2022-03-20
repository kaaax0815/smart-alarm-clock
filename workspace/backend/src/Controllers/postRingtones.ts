import { join } from 'path';
import { promisify } from 'util';

import db from '../database';
import { postRingtonesResponse, Request, Response } from '../Models';

export default async function postRingtones(req: Request, res: Response<postRingtonesResponse>) {
  if (!req.files || !req.files.ringtone || Array.isArray(req.files.ringtone)) {
    return res.status(400).json({ status: 'Bad request', location: '' });
  }
  const ringtone = req.files.ringtone;
  const move = promisify(ringtone.mv);
  const location = `/ringtones/${ringtone.name}`;
  const moveLocation = join(__dirname, '../../Ringtones', ringtone.name);
  await move(moveLocation);
  db.push('/ringtones', [{ name: ringtone.name, location: location }], false);
  return res.json({ status: 'success', location: location });
}
