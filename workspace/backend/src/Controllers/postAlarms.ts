import { createHttpError, defaultEndpointsFactory, z } from 'express-zod-api';

import database from '../database';
import { postAlarmsRequest } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'post',
  input: postAlarmsRequest,
  output: z.object({}),
  handler: async ({ input }) => {
    const alarms = await database.getAlarms();
    if (alarms.findIndex((alarm) => alarm.name === input.name) !== -1) {
      throw createHttpError(409, 'Alarm already exists');
    }
    const ringtones = await database.getRingtones();
    if (ringtones.findIndex((ringtone) => ringtone.name === input.ringtone) === -1) {
      throw createHttpError(409, "Ringtone doesn't exists");
    }
    await database.addAlarm(input);
    return {};
  }
});
