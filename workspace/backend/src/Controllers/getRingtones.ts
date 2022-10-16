import { defaultEndpointsFactory, z } from 'express-zod-api';

import database from '../database';
import { getRingtonesResponse } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'get',
  input: z.object({}),
  output: getRingtonesResponse,
  handler: async () => {
    const ringtones = await database.getRingtones();
    return { ringtones };
  }
});
