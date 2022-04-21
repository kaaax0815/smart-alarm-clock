import database from '../database';
import { deleteAlarmsRequest, deleteAlarmsResponse, Request, Response } from '../Models';

export default function deleteAlarms(
  req: Request<deleteAlarmsRequest>,
  res: Response<deleteAlarmsResponse>
) {
  const alarm = req.body;
  if (!alarm) {
    return res.status(400).send({ status: 'Missing request body' });
  }
  const alarms = database.getAlarms();
  if (alarms.findIndex((a) => a.name === alarm.name) === -1) {
    return res.status(404).send({ status: 'Alarm not found' });
  }
  database.deleteAlarm(alarm);
  const newAlarms = database.getAlarms();
  res.json({ status: 'success', alarms: newAlarms });
}
