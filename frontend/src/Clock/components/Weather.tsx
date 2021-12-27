import './Weather.css';

import { CircularProgress } from '@mui/material';
import OpenWeatherMap from 'openweathermap-ts';
import { useContext, useEffect, useState } from 'react';

import SettingsContext from '../../contexts/Settings';

function Weather(): JSX.Element {
  const settingsContext = useContext(SettingsContext);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<ThreeHours | Record<string, never>>({});
  useEffect(() => {
    const openWeather = new OpenWeatherMap({
      apiKey: process.env.REACT_APP_OPEN_WEATHER_API_KEY!
    });
    openWeather.setUnits('metric');
    openWeather
      .getThreeHourForecastByCityName({
        cityName: settingsContext.location.city,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        countryCode: settingsContext.location.countryCode as any,
        state: settingsContext.location.state
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      });
  }, [settingsContext.location]);
  if (loading) {
    return <CircularProgress color="inherit" />;
  }
  return (
    <div className="__Weather">
      {weather.list.map((item) => (
        <div>{item.main.temp} °C</div>
      ))}
    </div>
  );
}

export default Weather;

export interface ThreeHours {
  cod: string;
  message: number;
  cnt: number;
  list: (
    | {
        dt: number;
        main: {
          temp: number;
          temp_min: number;
          temp_max: number;
          pressure: number;
          sea_level: number;
          grnd_level: number;
          humidity: number;
          temp_kf: number;
        };
        weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
        }[];
        clouds: {
          all: number;
        };
        wind: {
          speed: number;
          deg: number;
        };
        sys: {
          pod: string;
        };
        dt_txt: string;
        rain?: undefined;
        snow?: undefined;
      }
    | {
        dt: number;
        main: {
          temp: number;
          temp_min: number;
          temp_max: number;
          pressure: number;
          sea_level: number;
          grnd_level: number;
          humidity: number;
          temp_kf: number;
        };
        weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
        }[];
        clouds: {
          all: number;
        };
        wind: {
          speed: number;
          deg: number;
        };
        rain: {
          '3h': number;
        };
        sys: {
          pod: string;
        };
        dt_txt: string;
        snow?: undefined;
      }
    | {
        dt: number;
        main: {
          temp: number;
          temp_min: number;
          temp_max: number;
          pressure: number;
          sea_level: number;
          grnd_level: number;
          humidity: number;
          temp_kf: number;
        };
        weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
        }[];
        clouds: {
          all: number;
        };
        wind: {
          speed: number;
          deg: number;
        };
        rain: {
          '3h': number;
        };
        snow: {
          '3h': number;
        };
        sys: {
          pod: string;
        };
        dt_txt: string;
      }
    | {
        dt: number;
        main: {
          temp: number;
          temp_min: number;
          temp_max: number;
          pressure: number;
          sea_level: number;
          grnd_level: number;
          humidity: number;
          temp_kf: number;
        };
        weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
        }[];
        clouds: {
          all: number;
        };
        wind: {
          speed: number;
          deg: number;
        };
        rain: {
          '3h'?: undefined;
        };
        snow: {
          '3h'?: undefined;
        };
        sys: {
          pod: string;
        };
        dt_txt: string;
      }
  )[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
  };
}
