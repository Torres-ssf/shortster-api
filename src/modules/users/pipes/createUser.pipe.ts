import { AppError } from '@shared/errors/AppError';
import { extractValidationErrors } from '@shared/utils/formatValidationError';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDTO } from '../useCases/CreateUser/CreateUserDTO';

export const createUserPipe = async (data: any): Promise<CreateUserDTO> => {
  const createShortsterDTO = plainToClass(CreateUserDTO, data);

  const paramErrors = await validate(createShortsterDTO);

  if (paramErrors.length) {
    const errorMessages = extractValidationErrors(paramErrors);

    throw new AppError(errorMessages);
  }

  return createShortsterDTO;
};
