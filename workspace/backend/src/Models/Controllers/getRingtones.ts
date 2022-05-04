import { z } from 'express-zod-api';

import { database } from '../database';

export const getRingtonesResponse = z.object({ ringtones: database.shape.ringtones });
