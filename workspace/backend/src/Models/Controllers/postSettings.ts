import { z } from 'express-zod-api';

import { database } from '../database';

const location = database.shape.settings.shape.location
  .pick({ city: true, countryCode: true })
  .optional();

const timezone = database.shape.settings.shape.timezone.optional();

export const postSettingsRequest = z.object({ timezone, location });
