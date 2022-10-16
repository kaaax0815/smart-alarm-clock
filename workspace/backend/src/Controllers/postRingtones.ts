import { createHttpError, defaultEndpointsFactory } from 'express-zod-api';
import { join } from 'path';
import { promisify } from 'util';

import database from '../database';
import { postRingtonesRequest, postRingtonesResponse } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'post',
  input: postRingtonesRequest,
  output: postRingtonesResponse,
  handler: async ({ input: { ringtone } }) => {
    if (ringtone.name === 'Alarm') {
      throw createHttpError(403, 'Cannot overwrite default ringtone');
    }
    if (!ringtone.name.endsWith('.mp3')) {
      throw createHttpError(415, 'Unsupported file type');
    }
    const ringtones = await database.getRingtones()
    if (ringtones.findIndex((r) => r.name === ringtone.name) !== -1) {
      throw createHttpError(409, 'Ringtone already exists');
    }
    const move = promisify(ringtone.mv);
    const location = `/ringtones/${ringtone.name}`;
    const moveLocation = join(__dirname, '../../Ringtones', ringtone.name);
    await move(moveLocation);
    await database.addRingtone({ name: ringtone.name.slice(0, -4), location: location });
    return { location };
  }
});
