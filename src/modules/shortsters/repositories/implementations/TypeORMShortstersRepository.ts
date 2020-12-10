import { getRepository, Repository } from 'typeorm';
import { Shortster } from '../../entities/Shortster';
import { IShortstersRepository } from '../IShortstersRepository';

export class TypeORMShortstersRepository implements IShortstersRepository {
  private ormRepository: Repository<Shortster>;

  constructor() {
    this.ormRepository = getRepository(Shortster);
  }

  async findByCode(code: string): Promise<Shortster | undefined> {
    return this.ormRepository.findOne({ where: { code } });
  }

  save(shortster: Shortster): Promise<Shortster> {
    return this.ormRepository.save(shortster);
  }
}
