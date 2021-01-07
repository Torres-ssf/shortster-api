import { AppError } from '@shared/errors/AppError';
import { FakeHashProvider } from '../../providers/HashProvider/fakes/FakeHashProvider';
import { FakeUsersRepository } from '../../repositories/fakes/FakeUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  let fakeUsersRepository: FakeUsersRepository;

  let fakeHashProvider: FakeHashProvider;

  const name = 'Paul Airon';

  const email = 'paul@email.com';

  const password = '123456';

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
    await fakeUsersRepository.create({ name, email, password });

    await expect(
      createUserUseCase.execute({
        name: 'Paul Airon',
        email: 'paul@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should call method to hash the password and save the hashed password', async () => {
    const generateHashSpy = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    expect(generateHashSpy).toHaveBeenCalledWith(password);
    expect(user.password === password).toBeFalsy();
  });

  it('should be able to create a new user', async () => {
    const createdUser = await createUserUseCase.execute({
      name: 'Paul Mark',
      email,
      password: '777888',
    });

    const foundedUser = await fakeUsersRepository.findByEmail(email);

    expect(foundedUser).toMatchObject(createdUser);
  });
});
