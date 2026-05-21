import { AxiosError } from 'axios';
import { getErrorDetails } from './apiErrors';

describe('getErrorDetails', () => {
  it('classifies network failures as connection errors', () => {
    const error = new AxiosError('Network Error', 'ERR_NETWORK');
    const details = getErrorDetails(error, 'fallback');

    expect(details.kind).toBe('connection');
    expect(details.message).toMatch(/Unable to reach the WeatherNow server/i);
  });

  it('classifies HTTP responses as server errors', () => {
    const error = new AxiosError('Bad Request', 'ERR_BAD_REQUEST', undefined, undefined, {
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: { headers: {} } as never,
      data: { message: 'Invalid city name' },
    });

    const details = getErrorDetails(error, 'fallback');

    expect(details.kind).toBe('server');
    expect(details.message).toBe('Invalid city name');
  });

  it('falls back to a generic message for unknown errors', () => {
    const details = getErrorDetails('unknown', 'Something went wrong');

    expect(details.kind).toBe('general');
    expect(details.message).toBe('Something went wrong');
  });
});
