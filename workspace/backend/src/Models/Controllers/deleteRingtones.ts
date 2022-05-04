import { z } from 'express-zod-api';

export const deleteRingtonesRequest = z.object({
  name: z.string(),
  location: z.string()
});
