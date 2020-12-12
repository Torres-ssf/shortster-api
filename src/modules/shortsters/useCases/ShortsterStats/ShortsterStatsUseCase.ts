import { inject, injectable } from 'tsyringe';
import { format } from 'date-fns';
import { AppError } from '@shared/errors/AppError';
import { IShortsterRepository } from '../../repositories/IShortsterRepository';

@injectable()
export class ShortsterStatsUseCase {
  constructor(
    @inject('ShortsterRepository')
    private shortsterRepository: IShortsterRepository,
  ) {}

  async execute(code: string): Promise<void> {
    const shortster = await this.shortsterRepository.findByCode(code);

    if (!shortster) {
      throw new AppError('no shortster found for the given id');
    }
  }
}
