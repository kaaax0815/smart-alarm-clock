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
    // TODO: check if ringtone exists
    database.addAlarm(input);
    return {};
  }
});
