import { AppError } from '@shared/errors/AppError';
import { extractValidationErrors } from '@shared/utils/formatValidationError';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { GetShortsterDTO } from '../useCases/GetShortster/GetShortsterDTO';

export const getShortsterPipe = async (data: any): Promise<GetShortsterDTO> => {
  const createShortsterDTO = plainToClass(GetShortsterDTO, data);

  const paramErrors = await validate(createShortsterDTO);

  if (paramErrors.length) {
    const errorMessages = extractValidationErrors(paramErrors);

    throw new AppError(errorMessages);
  }

  return createShortsterDTO;
};
