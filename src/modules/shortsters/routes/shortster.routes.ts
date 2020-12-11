import { Router } from 'express';
import { CreateShortsterController } from '../useCases/CreateShortster/CreateShortsterController';
import { createShortsterMiddleware } from '../useCases/CreateShortster/createShortsterMiddleware';
import { checkAuthenticated } from '../middlewares/checkUserAuthenticated';
import { GetShortsterController } from '../useCases/GetShortster/GetShortsterController';

export const shortsterRoutes = Router();

const createShortsterController = new CreateShortsterController();

const getShortsterController = new GetShortsterController();

shortsterRoutes.post(
  '/',
  checkAuthenticated,
  createShortsterMiddleware,
  createShortsterController.handle,
);

shortsterRoutes.get('/:code', getShortsterController.handle);
