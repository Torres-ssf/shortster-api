import { hash, genSalt, compare } from 'bcrypt';
import { IHashProvider } from '../models/IHashProvider';
import { CompareHashDTO } from '../dto/CompareHashDTO';

export class BcryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    const salt = await genSalt();

    return hash(payload, salt);
  }

  async compare({ hashed, payload }: CompareHashDTO): Promise<boolean> {
    return compare(payload, hashed);
  }
}
