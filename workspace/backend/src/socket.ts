import axios from 'axios';
import { Server } from 'socket.io';

import db from './database';
import { updateValue } from './Models/updateValue';

export default function socketIO(io: Server) {
  io.on('connection', (socket) => {
    socket.on('update-value', async (data: updateValue) => {
      const type = data.type;
      const value = data.value;
      if (value === undefined) {
        return;
      }
      switch (type) {
        case 'locale':
          db.push('/locale', value);
          break;
        case 'timezone':
          db.push('/timezone', value);
          break;
        case 'location':
          if (typeof value === 'string') {
            return;
          }
          // eslint-disable-next-line no-case-declarations
          const locationResponse = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${value.city},${value.countryCode}&limit=1&appid=${process.env.OPEN_WEATHER_API_KEY}`,
            { responseType: 'json' }
          );
          value.lat = locationResponse.data[0].lat;
          value.lon = locationResponse.data[0].lon;
          db.push('/location', value);
          break;
      }
    });
  });
}
