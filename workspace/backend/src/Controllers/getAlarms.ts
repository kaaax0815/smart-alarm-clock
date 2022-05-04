import { defaultEndpointsFactory, z } from 'express-zod-api';

import database from '../database';
import { getAlarmsResponse } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'get',
  input: z.object({}),
  output: getAlarmsResponse,
  handler: async () => {
    const alarms = database.getAlarms();
    return { alarms };
  }
});
