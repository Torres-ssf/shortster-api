import { v4 } from 'uuid';
import AppError from '../../../shared/errors/AppError';
import { User } from '../entities/User';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { UsersRepository } from '../repositories/UsersRepository';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
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
      throw new AppError('Error occurred while trying to create new user.');
    }

    return new User();
  }
}
