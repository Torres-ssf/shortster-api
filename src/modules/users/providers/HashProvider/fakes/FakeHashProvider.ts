import crypto from 'crypto';
import { IHashProvider } from '../models/IHashProvider';
import { CompareHashDTO } from '../dto/CompareHashDTO';

export class FakeHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    const hashedString = crypto.randomBytes(10).toString('hex');

    return payload.concat(hashedString);
  }

  async compare({ hashed, payload }: CompareHashDTO): Promise<boolean> {
    return hashed.includes(payload);
  }
}
