import db from '../database';
import { getRingtonesResponse, Request, Response } from '../Models';

export default async function postRingtones(req: Request, res: Response<getRingtonesResponse>) {
  const result = db.getData('/ringtones');
  res.json(result);
}
