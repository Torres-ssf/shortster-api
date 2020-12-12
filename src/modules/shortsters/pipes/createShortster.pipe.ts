import { AppError } from '@shared/errors/AppError';
import { extractValidationErrors } from '@shared/utils/formatValidationError';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateShortsterDTO } from '../useCases/CreateShortster/CreateShortsterDTO';

export const createShortsterPipe = async (
  data: any,
): Promise<CreateShortsterDTO> => {
  const createShortsterDTO = plainToClass(CreateShortsterDTO, data);

  const paramErrors = await validate(createShortsterDTO);

  if (paramErrors.length) {
    const errorMessages = extractValidationErrors(paramErrors);

    throw new AppError(errorMessages);
  }

  return createShortsterDTO;
};
