import { FakeHashProvider } from '../fakes/FakeHashProvider';
import { IHashProvider } from '../models/IHashProvider';

describe('HashProvider', () => {
  let hashProvider: IHashProvider;

  beforeEach(() => {
    hashProvider = new FakeHashProvider();
  });

  it('should generate a different salt each time salt method is called', async () => {
    const salt1 = await hashProvider.generateSalt();

    const salt2 = await hashProvider.generateSalt();

    const salt3 = await hashProvider.generateSalt();

    expect(salt1 !== salt2 || salt1 !== salt3 || salt2 !== salt3).toBeTruthy();
  });

  it('should use salt to hash the given payload', async () => {
    const salt = await hashProvider.generateSalt();

    const hashed = await hashProvider.generateHash({ payload: '123456', salt });

    expect(hashed.includes(salt)).toBeTruthy();
  });
});
