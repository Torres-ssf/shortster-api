import AppError from '../../../shared/errors/AppError';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(createUser: CreateUserDTO): Promise<User> {
    const { email } = createUser;

    const userExists = this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('Email already taken');
    }

    return new User();
  }
}
