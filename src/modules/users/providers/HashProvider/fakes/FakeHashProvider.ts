import crypto from 'crypto';
import { CompareHashDTO } from '../dto/CompareHashDTO';

import { GenerateHashDTO } from '../dto/GenerateHashDTO';
import { IHashProvider } from '../models/IHashProvider';

export class FakeHashProvider implements IHashProvider {
  async generateSalt(): Promise<string> {
    return crypto.randomBytes(10).toString('hex');
  }

  generateHash(generateHashDTO: GenerateHashDTO): Promise<string> {
    throw new Error('Method not implemented.');
  }

  compare(compareHashDTO: CompareHashDTO): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
