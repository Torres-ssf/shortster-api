import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';
import { extractValidationErrors } from '@shared/utils/formatValidationError';
import { CreateSessionDTO } from './CreateSessionDTO';

export async function createSessionMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const createSessionDTO = plainToClass(CreateSessionDTO, request.body);

  const paramErrors = await validate(createSessionDTO);

  if (paramErrors.length) {
    const errorMessages = extractValidationErrors(paramErrors);

    throw new AppError(errorMessages);
  }

  request.body.createSessionDTO = createSessionDTO;

  return next();
}
