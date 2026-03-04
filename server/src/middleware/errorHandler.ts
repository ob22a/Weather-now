import type { ErrorRequestHandler, RequestHandler } from 'express';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof AppError ? error.statusCode : 500;
  const message = error instanceof Error ? error.message : 'Internal Server Error';

  console.error('API error:', error);

  res.status(statusCode).json({
    message: statusCode === 500 ? 'Internal Server Error' : message,
    ...(process.env.NODE_ENV !== 'production' && { error: message }),
  });
};
