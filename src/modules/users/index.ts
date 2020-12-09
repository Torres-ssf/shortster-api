import './providers';

import { container } from 'tsyringe';

import { IUsersRepository } from './repositories/IUsersRepository';
import { FakeUsersRepository } from './repositories/fakes/FakeUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  FakeUsersRepository,
);
