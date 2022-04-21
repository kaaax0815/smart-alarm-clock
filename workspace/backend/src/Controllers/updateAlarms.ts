import database from '../database';
import { Request, Response, updateAlarmsRequest, updateAlarmsResponse } from '../Models';

export default function updateAlarms(
  req: Request<updateAlarmsRequest>,
  res: Response<updateAlarmsResponse>
) {
  const alarm = req.body;
  if (!alarm) {
    return res.status(400).send({ status: 'Missing request body' });
  }
  const alarms = database.getAlarms();
  if (alarms.findIndex((a) => a.name === alarm.name) === -1) {
    return res.status(404).send({ status: 'Alarm not found' });
  }
  database.updateAlarm(alarm);
  const updatedAlarm = database.getAlarms().find((a) => a.name === alarm.name);
  res.json({ status: 'success', alarm: updatedAlarm });
}
