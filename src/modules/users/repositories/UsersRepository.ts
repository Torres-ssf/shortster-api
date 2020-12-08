import { User } from '../entities/User';

export interface UsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
