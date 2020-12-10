import { Shortster } from '../../entities/Shortster';
import { IShortstersRepository } from '../IShortstersRepository';

export class FakeShortstersRepository implements IShortstersRepository {
  private shortsters: Shortster[] = [];

  async findByCode(code: string): Promise<Shortster | undefined> {
    return this.shortsters.find(shortster => shortster.code === code);
  }

  async save(shortster: Shortster): Promise<Shortster> {
    this.shortsters.push(shortster);

    return shortster;
  }
}
