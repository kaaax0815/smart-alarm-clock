import { z } from 'express-zod-api';

export const database = z.object({
  settings: z.object({
    timezone: z.string(),
    location: z.object({
      city: z.string(),
      countryCode: z.string(),
      lat: z.number(),
      lon: z.number()
    })
  }),
  ringtones: z.array(
    z.object({
      name: z.string(),
      location: z.string()
    })
  ),
  alarms: z.array(
    z.object({
      ringtone: z.string(),
      time: z.string(),
      days: z.array(z.boolean()).length(7),
      enabled: z.boolean(),
      name: z.string()
    })
  ),
  initialized: z.boolean()
});

export type database = z.infer<typeof database>;
