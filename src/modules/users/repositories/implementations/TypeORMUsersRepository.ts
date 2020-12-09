import { getRepository, Repository } from 'typeorm';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class TypeORMUsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
