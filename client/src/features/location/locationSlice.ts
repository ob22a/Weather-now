import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Location {
  country: string;
  city: string;
}

interface LocationState {
  current: Location | null;
}

const initialState: LocationState = {
  current: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation(state, action: PayloadAction<Location>) {
      state.current = action.payload;
    },
    clearLocation(state) {
      state.current = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
