import 'reflect-metadata';

import { AppError } from '@shared/errors/AppError';
import { User } from '../../entities/User';
import { FakeHashProvider } from '../../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { CreateSessionDTO } from './CreateSessionDTO';
import { CreateSessionUseCase } from './CreateSessionUseCase';

describe('CreateSessionUseCase', () => {
  let email: string;

  let password: string;

  let createSessionUseCase: CreateSessionUseCase;

  let fakeUsersRepository: FakeUsersRepository;

  let fakeHashProvider: FakeHashProvider;

  beforeEach(() => {
    email = 'paul@email.com';

    password = '123456';

    fakeUsersRepository = new FakeUsersRepository();

    fakeHashProvider = new FakeHashProvider();

    createSessionUseCase = new CreateSessionUseCase(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should return an error if no user is found for the given password', async () => {
    await expect(
      createSessionUseCase.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
