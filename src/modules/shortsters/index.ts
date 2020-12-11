import { container } from 'tsyringe';

import { IShortsterRepository } from './repositories/IShortsterRepository';
import { FakeShortstersRepository } from './repositories/fakes/FakeShortsterRepository';

container.registerSingleton<IShortsterRepository>(
  'ShortsterRepository',
  FakeShortstersRepository,
);
