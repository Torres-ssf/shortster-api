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

  it('should be able to create new shortster without providing a chosen code', async () => {
    await expect(
      createShortsterUseCase.execute({
        url: facebookUrl,
      }),
    ).resolves.toMatchObject({
      url: facebookUrl,
    });
  });

  it('should create a shortster with times_accessed property with the value of 0', async () => {
    const shortster = await createShortsterUseCase.execute({
      url: facebookUrl,
    });

    expect(shortster).toHaveProperty('times_accessed');
    expect(shortster.times_accessed).toBe(0);
  });

  it('should create a shortster with user_id when is available', async () => {
    const userId = v4();

    const shortster1 = await createShortsterUseCase.execute({
      url: facebookUrl,
    });

    const shortster2 = await createShortsterUseCase.execute({
      url: googleUrl,
      user_id: userId,
    });

    expect(shortster1).toHaveProperty('user_id');
    expect(shortster1.user_id).toBe(null);

    expect(shortster2).toHaveProperty('user_id');
    expect(shortster2.user_id).toBe(userId);
  });

  it('should have last_access, created_at, updated_at properties all with the current time', async () => {
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
