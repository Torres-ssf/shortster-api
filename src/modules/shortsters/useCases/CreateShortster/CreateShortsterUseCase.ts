import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import axios from 'axios';
import { AppError } from '@shared/errors/AppError';
import { generateShortsterCode } from '@shared/utils/generateShortsterCode';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { Shortster } from '../../entities/Shortster';
import { IShortsterRepository } from '../../repositories/IShortsterRepository';
import { CreateShortsterDTO } from './CreateShortsterDTO';

@injectable()
export class CreateShortsterUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ShortsterRepository')
    private shortsterRepository: IShortsterRepository,
  ) {}

  async execute(createShortsterDTO: CreateShortsterDTO): Promise<Shortster> {
    const { url, user_id } = createShortsterDTO;

    let { code } = createShortsterDTO;

    try {
      if (code) {
        const shortsterExists = await this.shortsterRepository.findByCode(code);

        if (shortsterExists) {
          throw new AppError('shortster code already in use');
        }
      } else {
        code = generateShortsterCode();
      }

      await axios.get(url);

      if (user_id) {
        const existentUser = await this.usersRepository.findById(user_id);

        if (!existentUser) {
          throw new AppError('no user was found for the given user id');
        }
      }

      const shortster = new Shortster();

      const currentTime = new Date();

      Object.assign(shortster, {
        id: v4(),
        code,
        url,
        user_id: user_id || null,
        times_accessed: 0,
        last_access: currentTime,
        created_at: currentTime,
        updated_at: currentTime,
      });

      await this.shortsterRepository.save(shortster);

      return shortster;
    } catch (err) {
      if (err.code === 'ENOTFOUND') {
        throw new AppError('webpage does not exist');
      }

      throw new AppError(
        err.message || 'error occurred while trying to create new shortster.',
      );
    }
  }
}
