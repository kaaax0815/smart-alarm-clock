import database from '../database';
import { getAlarmsResponse, Request, Response } from '../Models';

export default function getAlarms(req: Request, res: Response<getAlarmsResponse>) {
  const alarms = database.getAlarms();
  res.json(alarms);
}
