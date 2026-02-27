import {
  celsiusToFahrenheit,
  formatPrecipitation,
  formatTemperature,
  formatWindSpeed,
  kmhToMph,
  mmToInches,
} from './conversions';

describe('conversions', () => {
  it('converts celsius to fahrenheit', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
  });

  it('converts km/h to mph', () => {
    expect(kmhToMph(100)).toBeCloseTo(62.1371, 3);
  });

  it('converts mm to inches', () => {
    expect(mmToInches(25.4)).toBeCloseTo(1, 3);
  });

  it('formats temperature with unit suffix', () => {
    expect(formatTemperature(20, 'C')).toBe('20°C');
    expect(formatTemperature(0, 'F')).toBe('32°F');
  });

  it('formats wind speed with unit label', () => {
    expect(formatWindSpeed(10, 'kmh')).toBe('10 km/h');
    expect(formatWindSpeed(10, 'mph')).toBe('6 mph');
  });

  it('formats precipitation with precision per unit', () => {
    expect(formatPrecipitation(2.5, 'mm')).toBe('2.5 mm');
    expect(formatPrecipitation(2.5, 'in')).toBe('0.10 in');
  });
});
