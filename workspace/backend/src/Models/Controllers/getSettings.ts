import { z } from 'express-zod-api';

import { database } from '../database';

export const getSettingsResponse = z.object({ settings: database.shape.settings });
