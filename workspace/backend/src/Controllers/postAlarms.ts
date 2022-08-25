import { createHttpError, defaultEndpointsFactory, z } from 'express-zod-api';

import database from '../database';
import { postAlarmsRequest } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'post',
  input: postAlarmsRequest,
  output: z.object({}),
  handler: async ({ input }) => {
    if (database.getAlarms().findIndex((alarm) => alarm.name === input.name) !== -1) {
      throw createHttpError(409, 'Alarm already exists');
    }
    if (database.getRingtones().findIndex((ringtone) => ringtone.name === input.ringtone) === -1) {
      throw createHttpError(409, "Ringtone doesn't exists");
    }
    database.addAlarm(input);
    return {};
  }
});
