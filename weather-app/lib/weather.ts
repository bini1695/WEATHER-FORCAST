import axios from 'axios';
import { CurrentWeather, ForecastResponse } from './types';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(city: string): Promise<CurrentWeather> {
  const res = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });
  return res.data;
}

export async function getForecast(city: string): Promise<ForecastResponse> {
  const res = await axios.get(`${BASE_URL}/forecast`, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });
  return res.data;
}

// Group forecast by day (noon reading)
export function groupForecastByDay(list: ForecastResponse['list']) {
  const days: Record<string, ForecastResponse['list'][0]> = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    const hour = item.dt_txt.split(' ')[1];

    // Prefer the 12:00 reading for each day
    if (!days[date] || hour === '12:00:00') {
      days[date] = item;
    }
  });

  return Object.values(days).slice(0, 5);
}
