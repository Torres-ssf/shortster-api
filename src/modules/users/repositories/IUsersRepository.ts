import { User } from '../entities/User';
import { CreateUserDTO } from '../useCases/CreateUser/CreateUserDTO';

export interface IUsersRepository {
  create(createUserDTO: CreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
