import { CreateUserDTO } from '@modules/users/useCases/CreateUser/CreateUserDTO';
import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class TypeORMUsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  create(createUserDTO: CreateUserDTO): Promise<User> {
    const { name, email, password } = createUserDTO;

    const user = this.ormRepository.create({
      id: v4(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.save(user);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
