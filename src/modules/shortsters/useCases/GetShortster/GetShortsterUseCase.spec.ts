import 'reflect-metadata';
import { isAfter, addHours } from 'date-fns';
import { set } from 'mockdate';
import { FakeShortstersRepository } from '@modules/shortsters/repositories/fakes/FakeShortsterRepository';

import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { GetShortsterUseCase } from './GetShortsterUseCase';
import { CreateShortsterUseCase } from '../CreateShortster/CreateShortsterUseCase';

describe('GetShortsterUseCase', () => {
  let getShortsterUseCase: GetShortsterUseCase;

  let createShortsterUseCase: CreateShortsterUseCase;

  let fakeUsersRepository: FakeUsersRepository;

  let fakeShortstersRepository: FakeShortstersRepository;

  const googleUrl = 'https://www.google.com';

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeShortstersRepository = new FakeShortstersRepository();

    getShortsterUseCase = new GetShortsterUseCase(fakeShortstersRepository);

    createShortsterUseCase = new CreateShortsterUseCase(
      fakeUsersRepository,
      fakeShortstersRepository,
    );
  });

  it('should return an error if no shortster is found for the given code', async () => {
    await expect(
      getShortsterUseCase.execute('noExistentCode99'),
    ).rejects.toMatchObject({
      message: 'no shortster found for the given id',
    });
  });

  it('should increase by one times_accessed property every time a shortster is accessed', async () => {
    const { code, times_accessed } = await createShortsterUseCase.execute({
      url: googleUrl,
    });

    const updatedShortester = await getShortsterUseCase.execute(code);

    expect(updatedShortester.times_accessed).toBe(times_accessed + 1);
  });

  it('should update last_access value every time a shortster is accessed', async () => {
    const { code, last_access } = await createShortsterUseCase.execute({
      url: googleUrl,
    });

    const createdTime = new Date(last_access);

    set(addHours(last_access, 1));

    const updatedShortester = await getShortsterUseCase.execute(code);

    expect(isAfter(updatedShortester.last_access, createdTime)).toBeTruthy();
  });

  it('should return a shortster for the provided code', async () => {
    const { code } = await createShortsterUseCase.execute({
      url: googleUrl,
    });

    const shortster = await getShortsterUseCase.execute(code);

    expect(shortster.code).toBe(code);
  });
});
