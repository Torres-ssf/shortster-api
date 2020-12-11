import 'reflect-metadata';

import { Shortster } from '@modules/shortsters/entities/Shortster';
import { FakeShortstersRepository } from '@modules/shortsters/repositories/fakes/FakeShortsterRepository';

import { GetShortsterUseCase } from './GetShortsterUseCase';

describe('GetShortsterUseCase', () => {
  let getShortsterUseCase: GetShortsterUseCase;

  let fakeShortstersRepository: FakeShortstersRepository;

  beforeEach(() => {
    fakeShortstersRepository = new FakeShortstersRepository();

    getShortsterUseCase = new GetShortsterUseCase(fakeShortstersRepository);
  });

  it('should return an error if no shortster is found for the given code', async () => {
    await expect(
      getShortsterUseCase.execute('noExistentCode99'),
    ).rejects.toMatchObject({
      message: 'no shortster found for the given id',
    });
  });
});
