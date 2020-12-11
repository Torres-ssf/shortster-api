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
    const shortster = await this.shortsterRepository.findByCode(code);

    if (!shortster) {
      throw new AppError('no shortster found for the given id');
    }

    return new Shortster();
  }
}
