import './providers';

import { container } from 'tsyringe';

import { IUsersRepository } from './repositories/IUsersRepository';
import { TypeORMUsersRepository } from './repositories/implementations/TypeORMUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  TypeORMUsersRepository,
);
