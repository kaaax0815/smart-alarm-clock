import { join } from 'path';
import { promisify } from 'util';

import db from '../database';
import { postRingtonesResponse, Request, Response } from '../Models';

export default async function postRingtones(req: Request, res: Response<postRingtonesResponse>) {
  if (!req.files || !req.files.ringtone || Array.isArray(req.files.ringtone)) {
    return res.status(400).json({ status: 'Bad request', location: '' });
  }
  const ringtone = req.files.ringtone;
  if (ringtone.name === 'Alarm') {
    return res.status(403).json({ status: 'Cannot overwrite default ringtone', location: '' });
  }
  if (!ringtone.name.endsWith('.mp3')) {
    return res.status(415).json({ status: 'Unsupported file type', location: '' });
  }
  const move = promisify(ringtone.mv);
  const location = `/ringtones/${ringtone.name}`;
  const moveLocation = join(__dirname, '../../Ringtones', ringtone.name);
  await move(moveLocation);
  db.addRingtone({ name: ringtone.name.slice(0, -4), location: location });
  return res.json({ status: 'success', location: location });
}