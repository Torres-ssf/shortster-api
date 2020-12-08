import crypto from 'crypto';
import { IHashProvider } from '../models/IHashProvider';
import { CompareHashDTO } from '../dto/CompareHashDTO';
import { GenerateHashDTO } from '../dto/GenerateHashDTO';

export class FakeHashProvider implements IHashProvider {
  async generateSalt(): Promise<string> {
    return crypto.randomBytes(10).toString('hex');
  }

  async generateHash({ payload, salt }: GenerateHashDTO): Promise<string> {
    return payload.concat(salt);
  }

  async compare({ hashed, payload }: CompareHashDTO): Promise<boolean> {
    return hashed.includes(payload);
  }
}
