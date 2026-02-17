import sunny from '../assets/images/icon-sunny.webp';
import drizzle from '../assets/images/icon-drizzle.webp';
import fog from '../assets/images/icon-fog.webp';
import partlyCloudy from '../assets/images/icon-partly-cloudy.webp';
import rain from '../assets/images/icon-rain.webp';
import snow from '../assets/images/icon-snow.webp';
import storm from '../assets/images/icon-storm.webp';
import overcast from '../assets/images/icon-overcast.webp';
import type { WeatherIconMap } from '../types/IconMatch';

export const WEATHER_ICONS: WeatherIconMap = {
  sunny,
  drizzle,
  fog,
  'partly cloudy': partlyCloudy,
  rain,
  snow,
  storm,
  overcast,
  unknown: overcast,
};
