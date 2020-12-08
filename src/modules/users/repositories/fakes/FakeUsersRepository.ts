import { User } from '../../entities/User';
import { UsersRepository } from '../UsersRepository';

export class FakeUsersRepository implements UsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async save(user: User): Promise<User> {
    this.users.push(user);

    return user;
  }
}
