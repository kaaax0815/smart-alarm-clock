import { createHttpError, defaultEndpointsFactory, z } from 'express-zod-api';

import database from '../database';
import { deleteAlarmsRequest } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'delete',
  input: deleteAlarmsRequest,
  output: z.object({}),
  handler: async ({ input }) => {
    const alarms = database.getAlarms();
    if (alarms.findIndex((a) => a.name === input.name) === -1) {
      throw createHttpError(404, 'Alarm not found');
    }
    database.deleteAlarm(input);
    return {};
  }
});
