import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TempUnit = 'C' | 'F';
export type WindUnit = 'kmh' | 'mph';
export type PrecipUnit = 'mm' | 'in';

interface UnitsState {
  tempUnit: TempUnit;
  windUnit: WindUnit;
  precipUnit: PrecipUnit;
}

const initialState: UnitsState = {
  tempUnit: 'C',
  windUnit: 'kmh',
  precipUnit: 'mm',
};

const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    setTempUnit(state, action: PayloadAction<TempUnit>) {
      state.tempUnit = action.payload;
    },
    setWindUnit(state, action: PayloadAction<WindUnit>) {
      state.windUnit = action.payload;
    },
    setPrecipUnit(state, action: PayloadAction<PrecipUnit>) {
      state.precipUnit = action.payload;
    },
  },
});

export const { setTempUnit, setWindUnit, setPrecipUnit } = unitsSlice.actions;
export default unitsSlice.reducer;
