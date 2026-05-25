import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { AppError, errorHandler, notFoundHandler } from './errorHandler.js';

describe('AppError', () => {
  it('stores status code and message', () => {
    const error = new AppError('Not found', 404);
    expect(error.message).toBe('Not found');
    expect(error.statusCode).toBe(404);
  });
});

describe('notFoundHandler', () => {
  it('returns a 404 JSON payload for unknown routes', () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));

    notFoundHandler(
      { method: 'GET', originalUrl: '/api/missing' } as never,
      { status } as never,
    );

    expect(status).toHaveBeenCalledWith(404);
    expect(json).toHaveBeenCalledWith({
      message: 'Route not found: GET /api/missing',
    });
  });
});

describe('errorHandler', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns structured JSON for AppError', () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));

    errorHandler(
      new AppError('Invalid input', 400),
      {} as never,
      { status } as never,
      jest.fn(),
    );

    expect(status).toHaveBeenCalledWith(400);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Invalid input' }),
    );
  });

  it('masks internal errors in production responses', () => {
    const previousEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const json = jest.fn();
    const status = jest.fn(() => ({ json }));

    errorHandler(new Error('Database down'), {} as never, { status } as never, jest.fn());

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ message: 'Internal Server Error' });

    process.env.NODE_ENV = previousEnv;
  });
});
