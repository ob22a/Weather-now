import apiClient from './apiClient';
import type { LocationResponse, SearchResponse, WeatherResponse } from '../types/APIdata';

export const fetchMyLocation = async (): Promise<LocationResponse> => {
  const { data } = await apiClient.get<LocationResponse>('/location/my-location');
  return data;
};

export const searchLocations = async (text: string): Promise<SearchResponse> => {
  const { data } = await apiClient.get<SearchResponse>(`/location/search/${encodeURIComponent(text)}`);
  return data;
};

export const fetchWeather = async (country: string, city: string): Promise<WeatherResponse> => {
  const { data } = await apiClient.get<WeatherResponse>('/weather', {
    params: { country, city },
  });
  return data;
};


