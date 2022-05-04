import { defaultEndpointsFactory, z } from 'express-zod-api';

import database from '../database';
import { postAlarmsRequest } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'post',
  input: postAlarmsRequest,
  output: z.object({}),
  handler: async ({ input }) => {
    database.addAlarm(input);
    return {};
  }
});
