import { createSlice } from '@reduxjs/toolkit';
import type { WeatherData } from '../../types/APIdata';
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
}

const initialState: WeatherState = {
  data: null,
  isLoading: true,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeatherError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const setPending = (state: WeatherState) => {
      state.isLoading = true;
      state.error = null;
    };

    const setRejected = (state: WeatherState, message: string | undefined) => {
      state.isLoading = false;
      state.error = message ?? 'Unable to load weather data. Please try again.';
    };

    builder
      .addCase(initializeApp.pending, setPending)
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.weather;
        state.error = null;
      })
      .addCase(initializeApp.rejected, (state, action) => {
        setRejected(state, action.payload);
      })
      .addCase(fetchWeatherForLocation.pending, setPending)
      .addCase(fetchWeatherForLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchWeatherForLocation.rejected, (state, action) => {
        setRejected(state, action.payload);
      })
      .addCase(selectSearchResult.pending, setPending)
      .addCase(selectSearchResult.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.weather;
        state.error = null;
      })
      .addCase(selectSearchResult.rejected, (state, action) => {
        setRejected(state, action.payload);
      })
      .addCase(refreshCurrentWeather.pending, setPending)
      .addCase(refreshCurrentWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(refreshCurrentWeather.rejected, (state, action) => {
        setRejected(state, action.payload);
      });
  },
});

export const { clearWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;
