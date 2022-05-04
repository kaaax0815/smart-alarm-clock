import { z } from 'express-zod-api';

import { database } from '../database';

export const getAlarmsResponse = z.object({ alarms: database.shape.alarms });
