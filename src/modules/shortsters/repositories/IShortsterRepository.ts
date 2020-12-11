import { Shortster } from '../entities/Shortster';

export interface IShortsterRepository {
  findByCode(code: string): Promise<Shortster | undefined>;
  save(shortster: Shortster): Promise<Shortster>;
}
