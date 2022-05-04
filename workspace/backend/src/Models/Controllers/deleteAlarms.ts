import { z } from 'express-zod-api';

export const deleteAlarmsRequest = z.object({ name: z.string() });
