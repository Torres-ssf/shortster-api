import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { AppError } from '@shared/errors/AppError';
import { generateShortsterCode } from '@shared/utils/generateShortsterCode';
import { Shortster } from '../../entities/Shortster';
import { IShortsterRepository } from '../../repositories/IShortsterRepository';
import { CreateShortsterDTO } from './CreateShortsterDTO';

@injectable()
export class CreateShortsterUseCase {
  constructor(
    @inject('ShortsterRepository')
    private shortsterRepository: IShortsterRepository,
  ) {}

  async execute(createShortsterDTO: CreateShortsterDTO): Promise<Shortster> {
    let { code } = createShortsterDTO;

    if (code) {
      const shortsterExists = await this.shortsterRepository.findByCode(code);

      if (shortsterExists) {
        throw new AppError('shortster code already in use');
      }
    } else {
      code = generateShortsterCode();
    }
    return new Shortster();
  }
}
