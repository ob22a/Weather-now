import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMyLocation, fetchWeather } from '../../apis/weatherApi';
import type { SearchResultItem, WeatherData } from '../../types/APIdata';
import { setLocation, type Location } from '../location/locationSlice';
import { clearSearchResults } from '../search/searchSlice';
import type { RootState } from '../../app/store';

export const initializeApp = createAsyncThunk<
  { location: Location; weather: WeatherData },
  void,
  { rejectValue: string }
>('weather/initialize', async (_, { dispatch, rejectWithValue }) => {
  try {
    const locationResponse = await fetchMyLocation();
    const location: Location = {
      country: locationResponse.location.country,
      city: locationResponse.location.city,
    };
    dispatch(setLocation(location));

    const weatherResponse = await fetchWeather(location.country, location.city);
    return { location, weather: weatherResponse.weather };
  } catch {
    return rejectWithValue('Unable to detect your location. Please search manually.');
  }
});

export const fetchWeatherForLocation = createAsyncThunk<
  WeatherData,
  Location,
  { rejectValue: string }
>('weather/fetchForLocation', async (location, { rejectWithValue }) => {
  try {
    const response = await fetchWeather(location.country, location.city);
    return response.weather;
  } catch {
    return rejectWithValue('Unable to load weather data. Please try again.');
  }
});

export const refreshCurrentWeather = createAsyncThunk<
  WeatherData,
  void,
  { state: RootState; rejectValue: string }
>('weather/refresh', async (_, { getState, rejectWithValue }) => {
  const location = getState().location.current;
  if (!location) {
    return rejectWithValue('No location selected.');
  }

  try {
    const response = await fetchWeather(location.country, location.city);
    return response.weather;
  } catch {
    return rejectWithValue('Unable to load weather data. Please try again.');
  }
});

export const selectSearchResult = createAsyncThunk<
  { location: Location; weather: WeatherData },
  SearchResultItem,
  { state: RootState; rejectValue: string }
>('weather/selectSearchResult', async (item, { getState, dispatch, rejectWithValue }) => {
  const currentLocation = getState().location.current;
  const country = item.name ?? currentLocation?.country;
  const city = item.city ?? currentLocation?.city;

  if (!country || !city) {
    return rejectWithValue('Selected result is missing required location details.');
  }

  const location: Location = { country, city };
  dispatch(setLocation(location));
  dispatch(clearSearchResults());

  try {
    const response = await fetchWeather(location.country, location.city);
    return { location, weather: response.weather };
  } catch {
    return rejectWithValue('Unable to load weather data. Please try again.');
  }
});
