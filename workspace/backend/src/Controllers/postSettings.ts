import axios from 'axios';
import { createHttpError, defaultEndpointsFactory, z } from 'express-zod-api';

import db from '../database';
import { postSettingsRequest } from '../Models';

export default defaultEndpointsFactory.build({
  method: 'post',
  input: postSettingsRequest,
  output: z.object({}),
  handler: async ({ input: { timezone, location } }) => {
    timezone && db.setTimezone(timezone);
    if (location) {
      const [lat, lon] = await getGeoLocation(location.city, location.countryCode);
      if (lat !== undefined && lon !== undefined) {
        db.setLocation({ ...location, lat, lon });
      } else {
        throw createHttpError(400, 'Invalid location');
      }
    }
    return {};
  }
});

async function getGeoLocation(
  city: string,
  countryCode: string
): Promise<[lat: number | undefined, lon: number | undefined]> {
  try {
    const locationResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        city
      )},${encodeURIComponent(countryCode)}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`,
      { responseType: 'json' }
    );
    if (locationResponse.data.length === 0) {
      return [undefined, undefined];
    }
    return [locationResponse.data[0].lat, locationResponse.data[0].lon];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e.message || e);
    return [undefined, undefined];
  }
}
