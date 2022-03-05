import * as types from './types';

async function onecall(lat: number, lon: number, apiKey: string): Promise<types.FullForecast> {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&exclude=minutely`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export default onecall;
export * as types from './types';
