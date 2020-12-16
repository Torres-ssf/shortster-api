import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { IShortsterRepository } from '../../repositories/IShortsterRepository';

interface IResponse {
  created_at: Date;
  last_access: Date;
  times_accessed: number;
}

@injectable()
export class ShortsterStatsUseCase {
  constructor(
    @inject('ShortsterRepository')
    private shortsterRepository: IShortsterRepository,
  ) {}

  async execute(code: string): Promise<IResponse> {
    const shortster = await this.shortsterRepository.findByCode(code);

    if (!shortster) {
      throw new AppError('no shortster found for the given id');
    }

    const { created_at, last_access, times_accessed } = shortster;

    return {
      created_at,
      last_access,
      times_accessed,
    };
  }
}
