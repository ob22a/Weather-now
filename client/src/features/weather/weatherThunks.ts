import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMyLocation, fetchWeather } from '../../apis/weatherApi';
import type { SearchResultItem, WeatherData } from '../../types/APIdata';
import { setLocation, type Location } from '../location/locationSlice';
import { clearSearchResults } from '../search/searchSlice';
import type { RootState } from '../../app/store';
import type { AppErrorKind } from '../../utils/apiErrors';
import { getErrorDetails, toRejectPayload } from '../../utils/apiErrors';

type WeatherReject = { message: string; kind: AppErrorKind };

export const initializeApp = createAsyncThunk<
  { location: Location; weather: WeatherData },
  void,
  { rejectValue: WeatherReject }
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
  } catch (error) {
    const locationDetails = getErrorDetails(
      error,
      'Unable to detect your location. Please search manually.',
    );

    if (locationDetails.kind === 'connection') {
      return rejectWithValue(toRejectPayload(error, locationDetails.message));
    }

    return rejectWithValue(
      toRejectPayload(
        error,
        'Unable to detect your location. Please search manually.',
        'location',
      ),
    );
  }
});

export const fetchWeatherForLocation = createAsyncThunk<
  WeatherData,
  Location,
  { rejectValue: WeatherReject }
>('weather/fetchForLocation', async (location, { rejectWithValue }) => {
  try {
    const response = await fetchWeather(location.country, location.city);
    return response.weather;
  } catch (error) {
    return rejectWithValue(
      toRejectPayload(error, 'Unable to load weather data. Please try again.'),
    );
  }
});

export const refreshCurrentWeather = createAsyncThunk<
  WeatherData,
  void,
  { state: RootState; rejectValue: WeatherReject }
>('weather/refresh', async (_, { getState, rejectWithValue }) => {
  const location = getState().location.current;
  if (!location) {
    return rejectWithValue({
      message: 'No location selected.',
      kind: 'general',
    });
  }

  try {
    const response = await fetchWeather(location.country, location.city);
    return response.weather;
  } catch (error) {
    return rejectWithValue(
      toRejectPayload(error, 'Unable to load weather data. Please try again.'),
    );
  }
});

export const selectSearchResult = createAsyncThunk<
  { location: Location; weather: WeatherData },
  SearchResultItem,
  { state: RootState; rejectValue: WeatherReject }
>('weather/selectSearchResult', async (item, { getState, dispatch, rejectWithValue }) => {
  const currentLocation = getState().location.current;
  const country = item.name ?? currentLocation?.country;
  const city = item.city ?? currentLocation?.city;

  if (!country || !city) {
    return rejectWithValue({
      message: 'Selected result is missing required location details.',
      kind: 'general',
    });
  }

  const location: Location = { country, city };
  dispatch(setLocation(location));
  dispatch(clearSearchResults());

  try {
    const response = await fetchWeather(location.country, location.city);
    return { location, weather: response.weather };
  } catch (error) {
    return rejectWithValue(
      toRejectPayload(error, 'Unable to load weather data. Please try again.'),
    );
  }
});
