import type { WeatherIconMap } from './IconMatch';
import type { WeatherData } from './APIdata';
import type { Location } from '../features/location/locationSlice';

export interface MainPageProps {
  icons: WeatherIconMap;
  weather: WeatherData | null;
  location: Location | null;
  isLoading: boolean;
  isError: boolean;
}
