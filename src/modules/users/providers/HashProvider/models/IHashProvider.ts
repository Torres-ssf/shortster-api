import { CompareHashDTO } from '../dto/CompareHashDTO';

export interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compare(compareHashDTO: CompareHashDTO): Promise<boolean>;
}
