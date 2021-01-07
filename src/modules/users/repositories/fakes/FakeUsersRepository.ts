import { CreateUserDTO } from '@modules/users/useCases/CreateUser/CreateUserDTO';
import { v4 } from 'uuid';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  create(createUserDTO: CreateUserDTO): Promise<User> {
    const { name, email, password } = createUserDTO;

    const user = new User();

    Object.assign(user, {
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
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }
}
