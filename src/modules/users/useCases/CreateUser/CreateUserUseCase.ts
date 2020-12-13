import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { User } from '../../entities/User';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserDTO } from './CreateUserDTO';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(createUser: CreateUserDTO): Promise<User> {
    const { name, email, password } = createUser;

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email already taken');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    try {
      return this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
      });
    } catch (err) {
      throw new AppError(
        err.message || 'Error occurred while trying to create new user.',
      );
    }
  }
}
