import { AppError, errorHandler } from './errorHandler.js';

describe('AppError', () => {
  it('stores status code and message', () => {
    const error = new AppError('Not found', 404);
    expect(error.message).toBe('Not found');
    expect(error.statusCode).toBe(404);
  });
});

describe('errorHandler', () => {
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
