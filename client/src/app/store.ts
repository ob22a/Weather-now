import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../features/location/locationSlice';
import searchReducer from '../features/search/searchSlice';
import unitsReducer from '../features/units/unitsSlice';
import weatherReducer from '../features/weather/weatherSlice';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    search: searchReducer,
    units: unitsReducer,
    weather: weatherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
