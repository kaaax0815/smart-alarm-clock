import { defaultEndpointsFactory, z } from 'express-zod-api';

import db from '../database';
import { getRingtonesResponse } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'get',
  input: z.object({}),
  output: getRingtonesResponse,
  handler: async () => {
    const ringtones = db.getRingtones();
    return { ringtones };
  }
});
