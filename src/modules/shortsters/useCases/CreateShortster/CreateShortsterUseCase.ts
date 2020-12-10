import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import axios from 'axios';
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
    const { url, user_id } = createShortsterDTO;

    let { code } = createShortsterDTO;

    if (code) {
      const shortsterExists = await this.shortsterRepository.findByCode(code);

      if (shortsterExists) {
        throw new AppError('shortster code already in use');
      }
    } else {
      code = generateShortsterCode();
    }

    try {
      await axios.get(url);
    } catch (err) {
      throw new AppError('webpage does not exist');
    }

    const shortster = new Shortster();

    Object.assign(shortster, {
      id: v4(),
      code,
      url,
      user_id: user_id || null,
    });

    await this.shortsterRepository.save(shortster);

    return shortster;
  }
}
