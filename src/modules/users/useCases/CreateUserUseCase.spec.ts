import { v4 } from 'uuid';
import AppError from '../../../shared/errors/AppError';
import { User } from '../entities/User';
import { FakeUsersRepository } from '../repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  let fakeUsersRepository: FakeUsersRepository;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    createUserUseCase = new CreateUserUseCase(fakeUsersRepository);
  });

  it('should not be able to create a new user with an email already registered', async () => {
    const user = new User();

    user.id = v4();
    user.name = 'Paul Airon';
    user.email = 'paul@email.com';
    user.password = '123456';
    user.salt = 'passwordSalt';

    await fakeUsersRepository.save(user);

    await expect(
      createUserUseCase.execute({
        name: 'Paul Airon',
        email: 'paul@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
