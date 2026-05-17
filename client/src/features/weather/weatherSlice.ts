import { createSlice } from '@reduxjs/toolkit';
import type { WeatherData } from '../../types/APIdata';
import type { AppErrorKind } from '../../utils/apiErrors';
import {
  fetchWeatherForLocation,
  initializeApp,
  refreshCurrentWeather,
  selectSearchResult,
} from './weatherThunks';

interface WeatherState {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  errorKind: AppErrorKind | null;
}

const initialState: WeatherState = {
  data: null,
  isLoading: true,
  error: null,
  errorKind: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeatherError(state) {
      state.error = null;
      state.errorKind = null;
    },
  },
  extraReducers: (builder) => {
    const setPending = (state: WeatherState) => {
      state.isLoading = true;
    };

    const setRejected = (
      state: WeatherState,
      payload: { message: string; kind: AppErrorKind } | undefined,
    ) => {
      state.isLoading = false;
      state.error = payload?.message ?? 'Unable to load weather data. Please try again.';
      state.errorKind = payload?.kind ?? 'general';
    };

    builder
      .addCase(initializeApp.pending, setPending)
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.weather;
        state.error = null;
        state.errorKind = null;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        setRejected(state, action.payload);
      })
      .addCase(fetchWeatherForLocation.pending, setPending)
      .addCase(fetchWeatherForLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
        state.errorKind = null;
      })
      .addCase(fetchWeatherForLocation.rejected, (state, action) => {
        setRejected(state, action.payload);
      })
      .addCase(selectSearchResult.pending, setPending)
      .addCase(selectSearchResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.weather;
        state.error = null;
        state.errorKind = null;
      })
      .addCase(selectSearchResult.rejected, (state, action) => {
        setRejected(state, action.payload);
      })
      .addCase(refreshCurrentWeather.pending, setPending)
      .addCase(refreshCurrentWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
        state.errorKind = null;
      })
      .addCase(refreshCurrentWeather.rejected, (state, action) => {
        setRejected(state, action.payload);
      });
  },
});

export const { clearWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;
