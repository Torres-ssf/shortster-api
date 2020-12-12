import 'reflect-metadata';

import { FakeShortstersRepository } from '@modules/shortsters/repositories/fakes/FakeShortsterRepository';
import { v4 } from 'uuid';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { User } from '@modules/users/entities/User';
import { CreateShortsterUseCase } from './CreateShortsterUseCase';

describe('CreateShortsterUseCase', () => {
  let createShortsterUseCase: CreateShortsterUseCase;

  let fakeShortstersRepository: FakeShortstersRepository;

  let fakeUsersRepository: FakeUsersRepository;

  const facebookUrl = 'https://www.facebook.com';

  const googleUrl = 'https://www.google.com';

  const nonExistentPageUrl = 'https://www.nonexistentpageurlzzzzzfffff.com';

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeShortstersRepository = new FakeShortstersRepository();

    createShortsterUseCase = new CreateShortsterUseCase(
      fakeUsersRepository,
      fakeShortstersRepository,
    );
  });

  it('should return an error if given code is already in use', async () => {
    const shortster = await createShortsterUseCase.execute({
      code: 'personalizedCode',
      url: googleUrl,
    });

    await expect(
      createShortsterUseCase.execute({
        code: shortster.code,
        url: facebookUrl,
      }),
    ).rejects.toHaveProperty('message', 'shortster code already in use');
  });

  it('should return an error if the url is from a non existent webpage', async () => {
    await expect(
      createShortsterUseCase.execute({
        code: 'abc123',
        url: nonExistentPageUrl,
      }),
    ).rejects.toHaveProperty('message', 'webpage does not exist');
  });

  it('should return an error if given user was not found in the database', async () => {
    await expect(
      createShortsterUseCase.execute({
        user_id: v4(),
        url: googleUrl,
      }),
    ).rejects.toHaveProperty(
      'message',
      'no user was found for the given user id',
    );
  });

  it('should be able to create new shortster providing a chosen code', async () => {
    const myPersonalizedCode = 'mycode123';

    const shortster = await createShortsterUseCase.execute({
      code: myPersonalizedCode,
      url: googleUrl,
    });

    expect(shortster).toHaveProperty('code', myPersonalizedCode);
  });

  it('should be able to create new shortster without providing a chosen code', async () => {
    await expect(
      createShortsterUseCase.execute({
        url: facebookUrl,
      }),
    ).resolves.toMatchObject({
      url: facebookUrl,
    });
  });

  it('new shortsters should have times_accessed property with the value of 0', async () => {
    const shortster = await createShortsterUseCase.execute({
      url: facebookUrl,
    });

    expect(shortster).toHaveProperty('times_accessed');
    expect(shortster.times_accessed).toBe(0);
  });

  it('should assign new shortster to user when user id is given', async () => {
    const user = new User();

    Object.assign(user, {
      id: v4(),
      name: 'Paul',
      email: 'paul@email.com',
      password: '123456salt',
      salt: 'salt',
      created_at: new Date(),
      updated_at: new Date(),
    });

    await fakeUsersRepository.save(user);

    const shortster1 = await createShortsterUseCase.execute({
      url: facebookUrl,
    });

    const shortster2 = await createShortsterUseCase.execute({
      url: googleUrl,
      user_id: user.id,
    });

    expect(shortster1).toHaveProperty('user_id');
    expect(shortster1.user_id).toBe(null);

    expect(shortster2).toHaveProperty('user_id');
    expect(shortster2.user_id).toBe(user.id);
  });

  it('new shortster should have last_access, created_at, updated_at properties with the current time', async () => {
    const shortster = await createShortsterUseCase.execute({
      url: facebookUrl,
    });

    expect(shortster).toHaveProperty('last_access');
    expect(shortster).toHaveProperty('created_at');
    expect(shortster).toHaveProperty('updated_at');

    const { last_access, created_at, updated_at } = shortster;

    expect(last_access).toBe(created_at);
    expect(created_at).toBe(updated_at);
  });
});
