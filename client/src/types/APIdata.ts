import type { WeatherDescription } from './IconMatch';

export interface LocationResponse {
  message: string;
  location: {
    country: string;
    city: string;
  };
}

export interface SearchResultItem {
  name?: string;
  city?: string;
}

export interface SearchResponse {
  message: string;
  results: SearchResultItem[];
}

export interface DailyForecast {
  day: string;
  currentTemperature: number;
  highTemperature: number;
  lowTemperature: number;
  weatherDescription: WeatherDescription;
}

export interface HourlyForecast {
  time: string;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  temperature: number;
  weatherDescription: WeatherDescription;
}

export interface WeatherData {
  countryId: string;
  date: string;
  dailyForecast: DailyForecast[];
  hourlyForecast: HourlyForecast[];
}

export interface WeatherResponse {
  message: string;
  weather: WeatherData;
}

