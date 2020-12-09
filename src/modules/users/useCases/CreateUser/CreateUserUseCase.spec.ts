import { v4 } from 'uuid';
import { AppError } from '../../../../shared/errors/AppError';
import { User } from '../../entities/User';
import { FakeHashProvider } from '../../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  let fakeUsersRepository: FakeUsersRepository;

  let fakeHashProvider: FakeHashProvider;

  beforeEach(() => {
    jest.clearAllMocks();

    fakeUsersRepository = new FakeUsersRepository();

    fakeHashProvider = new FakeHashProvider();

    createUserUseCase = new CreateUserUseCase(
      fakeUsersRepository,
      fakeHashProvider,
    );
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

  it('should be able to create a new user', async () => {
    const email = 'paul@email.com';

    const createdUser = await createUserUseCase.execute({
      name: 'Paul Airon',
      email,
      password: '123456',
    });

    const foundedUser = await fakeUsersRepository.findByEmail(email);

    expect(foundedUser).toMatchObject(createdUser);
  });
});
