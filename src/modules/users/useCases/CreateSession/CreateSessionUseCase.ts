import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateSessionDTO } from './CreateSessionDTO';

@injectable()
export class CreateSessionUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(createSession: CreateSessionDTO): Promise<void> {
    const { email } = createSession;

    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('wrong email/password combination', 403);
    }
  }
}
