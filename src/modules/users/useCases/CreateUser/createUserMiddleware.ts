import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../../shared/errors/AppError';
import { extractValidationErrors } from '../../../../shared/utils/formatValidationError';
import { CreateUserDTO } from './CreateUserDTO';

export async function createUserMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const createUserDTO = plainToClass(CreateUserDTO, request.body);

  const paramErrors = await validate(createUserDTO);

  if (paramErrors.length) {
    const errorMessages = extractValidationErrors(paramErrors);

    throw new AppError(errorMessages);
  }

  request.body.createUserDTO = createUserDTO;

  return next();
}
