import { container } from 'tsyringe';

import { IShortsterRepository } from './repositories/IShortsterRepository';
import { TypeORMShortstersRepository } from './repositories/implementations/TypeORMShortstersRepository';

container.registerSingleton<IShortsterRepository>(
  'ShortsterRepository',
  TypeORMShortstersRepository,
);
