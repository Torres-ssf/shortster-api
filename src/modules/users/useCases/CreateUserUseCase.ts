import { inject, injectable } from 'tsyringe';
import { v4 } from 'uuid';
import { AppError } from '../../../shared/errors/AppError';
import { User } from '../entities/User';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../repositories/IUsersRepository';
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
    const { email, password } = createUser;

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email already taken');
    }

    const salt = await this.hashProvider.generateSalt();

    const hashedPassword = await this.hashProvider.generateHash({
      payload: password,
      salt,
    });

    const user = new User();

    Object.assign(user, {
      id: v4(),
      ...createUser,
      password: hashedPassword,
      salt,
    });

    try {
      return this.usersRepository.save(user);
    } catch (err) {
      throw new AppError(
        err.message || 'Error occurred while trying to create new user.',
      );
    }
  }
}
