import { z } from 'express-zod-api';

import { database } from '../database';

export const patchAlarmsRequest = database.shape.alarms.element.partial({
  days: true,
  time: true,
  enabled: true,
  ringtone: true
});

export const patchAlarmsResponse = z.object({
  alarm: database.shape.alarms.element
});
