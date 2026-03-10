import { weatherCodeConvertor, isExpired } from './status.js';

describe('weatherCodeConvertor', () => {
  it('maps clear sky to sunny', () => {
    expect(weatherCodeConvertor(0)).toBe('sunny');
  });

  it('maps partly cloudy codes', () => {
    expect(weatherCodeConvertor(1)).toBe('partly cloudy');
    expect(weatherCodeConvertor(2)).toBe('partly cloudy');
  });

  it('maps rain codes', () => {
    expect(weatherCodeConvertor(61)).toBe('rain');
    expect(weatherCodeConvertor(80)).toBe('rain');
  });

  it('returns unknown for unmapped codes', () => {
    expect(weatherCodeConvertor(999)).toBe('unknown');
  });
});

describe('isExpired', () => {
  it('returns false for recent timestamps', () => {
    expect(isExpired(new Date())).toBe(false);
  });

  it('returns true when cache is older than the threshold', () => {
    const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000);
    expect(isExpired(twentyMinutesAgo, 15)).toBe(true);
  });
});
