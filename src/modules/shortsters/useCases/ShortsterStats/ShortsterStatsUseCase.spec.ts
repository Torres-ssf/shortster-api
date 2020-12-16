import 'reflect-metadata';

import { FakeShortstersRepository } from '@modules/shortsters/repositories/fakes/FakeShortsterRepository';
import { FakeUsersRepository } from '@modules/users/repositories/fakes/FakeUsersRepository';
import { ShortsterStatsUseCase } from './ShortsterStatsUseCase';
import { CreateShortsterUseCase } from '../CreateShortster/CreateShortsterUseCase';
import { GetShortsterUseCase } from '../GetShortster/GetShortsterUseCase';

describe('ShortsterStatsUseCase', () => {
  let shortsterStatsUseCase: ShortsterStatsUseCase;

  let getShortsterUseCase: GetShortsterUseCase;

  let createShortsterUseCase: CreateShortsterUseCase;

  let fakeUsersRepository: FakeUsersRepository;

  let fakeShortstersRepository: FakeShortstersRepository;

  const googleUrl = 'https://www.google.com';

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeShortstersRepository = new FakeShortstersRepository();

    shortsterStatsUseCase = new ShortsterStatsUseCase(fakeShortstersRepository);

    getShortsterUseCase = new GetShortsterUseCase(fakeShortstersRepository);

    createShortsterUseCase = new CreateShortsterUseCase(
      fakeUsersRepository,
      fakeShortstersRepository,
    );
  });

  it('should return an error if no shortster is found for the given code', async () => {
    await expect(
      getShortsterUseCase.execute('noExistentShortsterCode'),
    ).rejects.toHaveProperty('message', 'no shortster found for the given id');
  });
});