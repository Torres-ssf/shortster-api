import { AppError } from '@shared/errors/AppError';
import { extractValidationErrors } from '@shared/utils/formatValidationError';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateSessionDTO } from '../useCases/CreateSession/CreateSessionDTO';

export const createSessionPipe = async (
  data: any,
): Promise<CreateSessionDTO> => {
  const createShortsterDTO = plainToClass(CreateSessionDTO, data);

  const paramErrors = await validate(createShortsterDTO);

  if (paramErrors.length) {
    const errorMessages = extractValidationErrors(paramErrors);

    throw new AppError(errorMessages);
  }

  return createShortsterDTO;
};
