import crypto from 'crypto';
import { CompareHashDTO } from '../dto/CompareHashDTO';

import { GenerateHashDTO } from '../dto/GenerateHashDTO';
import { IHashProvider } from '../models/IHashProvider';

export class FakeHashProvider implements IHashProvider {
  async generateSalt(): Promise<string> {
    return crypto.randomBytes(10).toString('hex');
  }

  async generateHash({ payload, salt }: GenerateHashDTO): Promise<string> {
    return payload.concat(salt);
  }

  compare(compareHashDTO: CompareHashDTO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
