import { CompareHashDTO } from '../dto/CompareHashDTO';
import { GenerateHashDTO } from '../dto/GenerateHashDTO';

export interface IHashProvider {
  generateSalt(): Promise<string>;
  generateHash(generateHashDTO: GenerateHashDTO): Promise<string>;
  compare(compareHashDTO: CompareHashDTO): Promise<boolean>;
}
