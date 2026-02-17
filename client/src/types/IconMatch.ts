export type WeatherDescription =
  | 'sunny'
  | 'partly cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'storm'
  | 'unknown';

export interface WeatherIconMap {
  sunny: string;
  drizzle: string;
  fog: string;
  'partly cloudy': string;
  rain: string;
  snow: string;
  storm: string;
  overcast: string;
  unknown: string;
}

export const getWeatherIcon = (description: WeatherDescription, icons: WeatherIconMap): string => {
  switch (description) {
    case 'sunny':
      return icons.sunny;
    case 'drizzle':
      return icons.drizzle;
    case 'fog':
      return icons.fog;
    case 'partly cloudy':
      return icons['partly cloudy'];
    case 'rain':
      return icons.rain;
    case 'snow':
      return icons.snow;
    case 'storm':
      return icons.storm;
    case 'overcast':
      return icons.overcast;
    default:
      return icons.unknown;
  }
};

