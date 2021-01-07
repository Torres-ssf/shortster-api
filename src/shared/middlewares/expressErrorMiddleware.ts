import 'express-async-errors';
import { Request, Response, NextFunction } from 'express';
import { AppError, errorCode } from '../errors/AppError';

export const expressErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _: NextFunction,
): Response => {
  if (err instanceof AppError) {
    const { statusCode, message } = err;
    return res.status(statusCode).json({
      status: statusCode,
      message,
      error: errorCode[statusCode] ? errorCode[statusCode] : 'Bad Request',
    });
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
};
