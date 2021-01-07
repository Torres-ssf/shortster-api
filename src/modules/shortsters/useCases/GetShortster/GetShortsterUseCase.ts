import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { Shortster } from '../../entities/Shortster';
import { IShortsterRepository } from '../../repositories/IShortsterRepository';

@injectable()
export class GetShortsterUseCase {
  constructor(
    @inject('ShortsterRepository')
    private shortsterRepository: IShortsterRepository,
  ) {}

  async execute(code: string): Promise<Shortster> {
    try {
      const shortster = await this.shortsterRepository.findByCode(code);

      if (!shortster) {
        throw new AppError('no shortster found for the given id');
      }

      shortster.times_accessed = Number(shortster.times_accessed) + 1;

      shortster.last_access = new Date();

      await this.shortsterRepository.save(shortster);

      return shortster;
    } catch (err) {
      throw new AppError(
        err.message || 'error occurred while trying to get shortster.',
      );
    }
  }
}
