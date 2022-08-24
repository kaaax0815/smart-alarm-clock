import { createHttpError, defaultEndpointsFactory, z } from 'express-zod-api';
import { rm } from 'fs/promises';
import { join } from 'path';

import db from '../database';
import { deleteRingtonesRequest } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'delete',
  input: deleteRingtonesRequest,
  output: z.object({}),
  handler: async ({ input, logger }) => {
    if (input.name === 'Alarm') {
      throw createHttpError(403, 'Cannot delete default ringtone');
    }
    db.deleteRingtone(input);
    await rm(join(__dirname, '../../Ringtones', input.name + '.mp3')).catch((e) => {
      logger.error(e.message);
    });
    return {};
  }
});
