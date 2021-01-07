import { inject, injectable } from 'tsyringe';
import { format } from 'date-fns';

import { AppError } from '@shared/errors/AppError';
import { IShortsterRepository } from '../../repositories/IShortsterRepository';

interface IResponse {
  url: string;
  created_at: string;
  last_access: string;
  times_accessed: number;
}

@injectable()
export class ShortsterStatsUseCase {
  constructor(
    @inject('ShortsterRepository')
    private shortsterRepository: IShortsterRepository,
  ) {}

  async execute(code: string): Promise<IResponse> {
    try {
      const shortster = await this.shortsterRepository.findByCode(code);

      if (!shortster) {
        throw new AppError('no shortster found for the given id');
      }

      const { created_at, last_access, times_accessed, url } = shortster;

      return {
        url,
        created_at: format(created_at, 'PPPppp'),
        last_access: format(last_access, 'PPPppp'),
        times_accessed: Number(times_accessed),
      };
    } catch (err) {
      throw new AppError(
        err.message || 'error occurred while trying to get shortster.',
      );
    }
  }
}
