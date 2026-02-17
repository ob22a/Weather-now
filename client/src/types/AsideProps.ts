import type { WeatherData } from './APIdata';
import type { WeatherIconMap } from './IconMatch';

export interface AsideProps {
  icons: WeatherIconMap;
  weather: WeatherData | null;
  isLoading: boolean;
}

