import { Shortster } from '@modules/shortsters/entities/Shortster';
import { FakeShortstersRepository } from '@modules/shortsters/repositories/fakes/FakeShortsterRepository';
import { generateShortsterCode } from '@shared/utils/generateShortsterCode';
import { v4 } from 'uuid';
import axios from 'axios';
import { CreateShortsterUseCase } from './CreateShortsterUseCase';

describe('CreateShortsterUseCase', () => {
  let createShortsterUseCase: CreateShortsterUseCase;

  let fakeShortstersRepository: FakeShortstersRepository;

  beforeEach(() => {
    fakeShortstersRepository = new FakeShortstersRepository();

    createShortsterUseCase = new CreateShortsterUseCase(
      fakeShortstersRepository,
    );
  });

  it('should return an error if a code already in use is given', async () => {
    const shortster = new Shortster();

    Object.assign(shortster, {
      id: v4(),
      code: generateShortsterCode(),
      url: 'https://www.google.com',
      last_access: new Date(),
    });

    await fakeShortstersRepository.save(shortster);

    await expect(
      createShortsterUseCase.execute({
        code: shortster.code,
        url: 'https://www.facebook.com',
      }),
    ).rejects.toHaveProperty('message', 'shortster code already in use');
  });

  it('should return an error if the url is from a non existent webpage', async () => {
    await expect(
      createShortsterUseCase.execute({
        code: 'abc123',
        url: 'http://www.nonexistentwebpage.com',
      }),
    ).rejects.toHaveProperty('message', 'webpage does not exist');
  });
});
