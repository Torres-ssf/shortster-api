import { hash, genSalt, compare } from 'bcrypt';
import { IHashProvider } from '../models/IHashProvider';
import { CompareHashDTO } from '../dto/CompareHashDTO';
import { GenerateHashDTO } from '../dto/GenerateHashDTO';

export class BcryptHashProvider implements IHashProvider {
  async generateSalt(): Promise<string> {
    return genSalt();
  }

  async generateHash({ payload, salt }: GenerateHashDTO): Promise<string> {
    return hash(payload, salt);
  }

  async compare({ hashed, payload }: CompareHashDTO): Promise<boolean> {
    return compare(payload, hashed);
  }
}
