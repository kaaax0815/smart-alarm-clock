import database from '../database';
import { postAlarmsRequest, postAlarmsResponse, Request, Response } from '../Models';

export default function postAlarms(
  req: Request<postAlarmsRequest>,
  res: Response<postAlarmsResponse>
) {
  const alarm = req.body;
  if (!alarm) {
    return res.status(400).json({ status: 'Missing request body' });
  }
  database.addAlarm(alarm);
  const newAlarms = database.getAlarms();
  res.json({ status: 'success', db: newAlarms });
}
