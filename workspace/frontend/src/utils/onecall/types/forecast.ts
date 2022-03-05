import { Alert } from './alerts';
import { CurrentDataBlock } from './current';
import { DailyDataBlock } from './daily';
import { HourlyDataBlock } from './hourly';

/**
 * API response for OpenWeatherMap's one-call endpoint.
 *
 * See {@link https://openweathermap.org/api/one-call-api#parameter Api Parameters} for more info.
 */
export interface Forecast {
  /**
   * Geographical coordinates of the location (latitude).
   */
  lat: number;

  /**
   * Geographical coordinates of the location (longitude)
   */
  lon: number;

  /**
   * Timezone name for the requested location.
   */
  timezone: string;

  /**
   * Shift in seconds from UTC.
   */
  timezone_offset: number;
}

/**
 * A forecast object containing all of the data blocks.
 *
 * This is the default response if you do not exclude any data blocks in your request.
 */
export interface FullForecast extends Forecast {
  /**
   * A data block containing the current weather conditions at the requested location.
   */
  current: CurrentDataBlock;

  /**
   * A list of data blocks containing weather conditions for the next two days (48 hours).
   */
  hourly: HourlyDataBlock[];

  /**
   * A list of data blocks containing weather for the next 5 days.
   */
  daily: DailyDataBlock[];

  /**
   * National weather alerts data from major national weather warning systems.
   */
  alerts: Alert[];
}
