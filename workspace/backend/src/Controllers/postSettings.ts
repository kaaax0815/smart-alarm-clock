import axios from 'axios';

import db from '../database';
import { postSettingsRequest, postSettingsResponse, Request, Response } from '../Models';

async function postSettings(
  req: Request<postSettingsRequest>,
  res: Response<postSettingsResponse>
) {
  const timezone = req.body.timezone;
  const location = req.body.location;
  timezone && db.setTimezone(timezone);
  if (location) {
    const [lat, lon] = await getGeoLocation(location.city, location.countryCode);
    if (lat !== undefined && lon !== undefined) {
      location.lat = lat;
      location.lon = lon;
      db.setLocation(location as TypedLocation);
    }
  }
  res.json({ status: 'success', db: db.getSettings() });
}

type TypedLocation = Omit<Exclude<postSettingsRequest['location'], undefined>, 'lat' | 'lon'> & {
  lat: number;
  lon: number;
};

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
      console.error(`Could not find location: ${city}, ${countryCode}`);
      return [undefined, undefined];
    }
    return [locationResponse.data[0].lat, locationResponse.data[0].lon];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error(e.message || e);
    return [undefined, undefined];
  }
}
export default postSettings;
