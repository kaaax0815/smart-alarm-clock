import { rm } from 'fs/promises';
import { join } from 'path';

import db from '../database';
import { deleteRingtonesRequest, deleteRingtonesResponse, Request, Response } from '../Models';

export default async function deleteRingtones(
  req: Request<deleteRingtonesRequest>,
  res: Response<deleteRingtonesResponse>
) {
  const ringtone = req.body;
  if (!ringtone) {
    return res.status(400).send({ status: 'Missing request body' });
  }
  if (ringtone.name === 'Alarm') {
    return res.status(403).send({ status: 'Cannot delete default ringtone' });
  }
  db.deleteRingtone(ringtone);
  await rm(join(__dirname, '../../Ringtones', ringtone.name)).catch((e) => {
    console.error(e.message);
  });
  res.json({ status: 'success' });
}
