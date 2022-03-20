import { rm } from 'fs/promises';
import { join } from 'path';

import db from '../database';
import {
  database,
  deleteRingtonesRequest,
  deleteRingtonesResponse,
  Request,
  Response
} from '../Models';

export default async function deleteRingtones(
  req: Request<deleteRingtonesRequest>,
  res: Response<deleteRingtonesResponse>
) {
  const ringtone = req.body.ringtone;
  if (!ringtone) {
    return res.status(400).send({ status: 'Request body is missing ringtone' });
  }
  if (ringtone.name === 'Alarm') {
    return res.status(403).send({ status: 'Cannot delete default ringtone' });
  }
  const oldRingtones = db.getData('/ringtones') as database['ringtones'];
  const newRingtones = oldRingtones.filter((item) => item.name !== ringtone.name);
  db.push('/ringtones', newRingtones);
  await rm(join(__dirname, '../../Ringtones', ringtone.name)).catch((e) => {
    console.error(e.message);
  });
  res.json({ status: 'success' });
}
