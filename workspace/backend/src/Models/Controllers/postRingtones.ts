import { z } from 'express-zod-api';

export const postRingtonesRequest = z.object({ ringtone: z.upload() });

export const postRingtonesResponse = z.object({
  location: z.string()
});
