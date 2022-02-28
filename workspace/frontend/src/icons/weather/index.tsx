import { WeatherIcon } from '../../utils/onecall/types';
// Based on <https://openweathermap.org/weather-conditions#Icon-list>
import { ReactComponent as ScatteredCloudsDay } from './SVG/cloudy.svg';
import { ReactComponent as ScatteredCloudsNight } from './SVG/cloudy.svg';
import { ReactComponent as ClearSkyDay } from './SVG/day_clear.svg';
import { ReactComponent as FewCloudsDay } from './SVG/day_partial_cloud.svg';
import { ReactComponent as RainDay } from './SVG/day_rain.svg';
import { ReactComponent as ThunderstormDay } from './SVG/day_rain_thunder.svg';
import { ReactComponent as MistDay } from './SVG/mist.svg';
import { ReactComponent as MistNight } from './SVG/mist.svg';
import { ReactComponent as ClearSkyNight } from './SVG/night_full_moon_clear.svg';
import { ReactComponent as FewCloudsNight } from './SVG/night_full_moon_partial_cloud.svg';
import { ReactComponent as RainNight } from './SVG/night_full_moon_rain.svg';
import { ReactComponent as ThunderstormNight } from './SVG/night_full_moon_rain_thunder.svg';
import { ReactComponent as BrokenCloudsDay } from './SVG/overcast.svg';
import { ReactComponent as BrokenCloudsNight } from './SVG/overcast.svg';
import { ReactComponent as ShowerRainDay } from './SVG/rain.svg';
import { ReactComponent as ShowerRainNight } from './SVG/rain.svg';
import { ReactComponent as SnowDay } from './SVG/snow.svg';
import { ReactComponent as SnowNight } from './SVG/snow.svg';

export default function Weather({
  id,
  className,
  title
}: {
  id: WeatherIcon;
  className?: string;
  title?: string;
}): JSX.Element {
  let WeatherIcon = ClearSkyDay;
  switch (id) {
    case '01d':
      WeatherIcon = ClearSkyDay;
      break;
    case '01n':
      WeatherIcon = ClearSkyNight;
      break;
    case '02d':
      WeatherIcon = FewCloudsDay;
      break;
    case '02n':
      WeatherIcon = FewCloudsNight;
      break;
    case '03d':
      WeatherIcon = ScatteredCloudsDay;
      break;
    case '03n':
      WeatherIcon = ScatteredCloudsNight;
      break;
    case '04d':
      WeatherIcon = BrokenCloudsDay;
      break;
    case '04n':
      WeatherIcon = BrokenCloudsNight;
      break;
    case '09d':
      WeatherIcon = ShowerRainDay;
      break;
    case '09n':
      WeatherIcon = ShowerRainNight;
      break;
    case '10d':
      WeatherIcon = RainDay;
      break;
    case '10n':
      WeatherIcon = RainNight;
      break;
    case '11d':
      WeatherIcon = ThunderstormDay;
      break;
    case '11n':
      WeatherIcon = ThunderstormNight;
      break;
    case '13d':
      WeatherIcon = SnowDay;
      break;
    case '13n':
      WeatherIcon = SnowNight;
      break;
    case '50d':
      WeatherIcon = MistDay;
      break;
    case '50n':
      WeatherIcon = MistNight;
      break;
  }
  return <WeatherIcon className={className} title={title} />;
}
