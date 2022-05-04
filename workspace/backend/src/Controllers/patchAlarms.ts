import { createHttpError, defaultEndpointsFactory } from 'express-zod-api';

import database from '../database';
import { patchAlarmsRequest, patchAlarmsResponse } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'patch',
  input: patchAlarmsRequest,
  output: patchAlarmsResponse,
  handler: async ({ input }) => {
    const alarms = database.getAlarms();
    if (alarms.findIndex((a) => a.name === input.name) === -1) {
      throw createHttpError(404, 'Alarm not found');
    }
    database.updateAlarm(input);
    const updatedAlarm = database.getAlarms().find((a) => a.name === input.name)!;
    return { alarm: updatedAlarm };
  }
});
