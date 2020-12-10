import { Shortster } from '@modules/shortsters/entities/Shortster';
import { FakeShortstersRepository } from '@modules/shortsters/repositories/fakes/FakeShortsterRepository';
import { generateShortsterCode } from '@shared/utils/generateShortsterCode';
import { v4 } from 'uuid';
import { CreateShortsterUseCase } from './CreateShortsterUseCase';

describe('CreateShortsterUseCase', () => {
  let createShortsterUseCase: CreateShortsterUseCase;

  let fakeShortstersRepository: FakeShortstersRepository;

  const facebookUrl = 'https://www.facebook.com';

  const googleUrl = 'https://www.google.com';

  const nonExistentPageUrl = 'https://www.nonexistentpageurlzzzzzfffff.com';

  beforeEach(() => {
    fakeShortstersRepository = new FakeShortstersRepository();

    createShortsterUseCase = new CreateShortsterUseCase(
      fakeShortstersRepository,
    );
  });

  it('should return an error if given code is already in use', async () => {
    const shortster = new Shortster();

    Object.assign(shortster, {
      id: v4(),
      code: generateShortsterCode(),
      url: facebookUrl,
    });

    await fakeShortstersRepository.save(shortster);

    await expect(
      createShortsterUseCase.execute({
        code: shortster.code,
        url: googleUrl,
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

  it('should be able to create new shortster providing a chosen code', async () => {
    const myPersonalizedCode = 'mycode123';

    await expect(
      createShortsterUseCase.execute({
        code: myPersonalizedCode,
        url: googleUrl,
      }),
    ).resolves.toMatchObject({
      code: myPersonalizedCode,
      url: googleUrl,
    });
  });
});
