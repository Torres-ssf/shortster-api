import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '@shared/errors/AppError';
import { extractValidationErrors } from '@shared/utils/formatValidationError';
import { CreateShortsterDTO } from './CreateShortsterDTO';

export async function createShortsterMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const createShortsterDTO = plainToClass(CreateShortsterDTO, request.body);

  const paramErrors = await validate(createShortsterDTO);

  if (paramErrors.length) {
    const errorMessages = extractValidationErrors(paramErrors);

    throw new AppError(errorMessages);
  }

  request.body.createShortsterDTO = createShortsterDTO;

  return next();
}
