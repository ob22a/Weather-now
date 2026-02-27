import unitsReducer, { setPrecipUnit, setTempUnit, setWindUnit } from './unitsSlice';

describe('unitsSlice', () => {
  it('updates temperature unit', () => {
    const state = unitsReducer(undefined, setTempUnit('F'));
    expect(state.tempUnit).toBe('F');
  });

  it('updates wind unit', () => {
    const state = unitsReducer(undefined, setWindUnit('mph'));
    expect(state.windUnit).toBe('mph');
  });

  it('updates precipitation unit', () => {
    const state = unitsReducer(undefined, setPrecipUnit('in'));
    expect(state.precipUnit).toBe('in');
  });
});
