import { Shortster } from '../entities/Shortster';

export interface IShortstersRepository {
  findByCode(code: string): Promise<Shortster | undefined>;
  save(shortster: Shortster): Promise<Shortster>;
}
