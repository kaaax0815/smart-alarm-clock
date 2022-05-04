import { defaultEndpointsFactory, z } from 'express-zod-api';

import db from '../database';
import { getSettingsResponse } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'get',
  input: z.object({}),
  output: getSettingsResponse,
  handler: async () => {
    const settings = db.getSettings();
    return { settings };
  }
});
