import { FakeHashProvider } from '../fakes/FakeHashProvider';
import { IHashProvider } from '../models/IHashProvider';

describe('HashProvider', () => {
  let hashProvider: IHashProvider;

  let salt: string;

  beforeEach(async () => {
    hashProvider = new FakeHashProvider();

    salt = await hashProvider.generateSalt();
  });

  it('should generate a different salt each time salt method is called', async () => {
    const salt2 = await hashProvider.generateSalt();

    const salt3 = await hashProvider.generateSalt();

    expect(salt !== salt2 || salt !== salt3 || salt2 !== salt3).toBeTruthy();
  });

  it('should use salt to hash the given payload', async () => {
    const hashed = await hashProvider.generateHash({ payload: '123456', salt });

    expect(hashed.includes(salt)).toBeTruthy();
  });

  it('should hash the given payload', async () => {
    const payload = '123456';

    const hashed = await hashProvider.generateHash({ payload, salt });

    expect(payload !== hashed).toBeTruthy();
  });

  it('should return false for a wrong payload', async () => {
    const payload = '123456';

    const wrongPayload = '888888';

    const hashed = await hashProvider.generateHash({ payload, salt });

    await expect(
      hashProvider.compare({ hashed, payload: wrongPayload }),
    ).resolves.toBeFalsy();
  });

  it('should return true for the right payload', async () => {
    const payload = '123456';

    const hashed = await hashProvider.generateHash({ payload, salt });

    await expect(
      hashProvider.compare({ hashed, payload }),
    ).resolves.toBeTruthy();
  });
});
