import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
import { auth } from '@config/auth';
import { User } from '@modules/users/entities/User';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateSessionDTO } from './CreateSessionDTO';

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export class CreateSessionUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute(createSession: CreateSessionDTO): Promise<IResponse> {
    const { email, password } = createSession;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('wrong email/password combination', 403);
    }

    const passwordMatch = await this.hashProvider.compare({
      payload: password,
      hashed: user.password,
    });

    if (!passwordMatch) {
      throw new AppError('wrong email/password combination', 403);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret as string, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
