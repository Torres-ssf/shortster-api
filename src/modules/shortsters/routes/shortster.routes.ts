import { Router } from 'express';
import { CreateShortsterController } from '../useCases/CreateShortster/CreateShortsterController';
import { createShortsterMiddleware } from '../useCases/CreateShortster/createShortsterMiddleware';
import { checkAuthenticated } from '../middlewares/checkUserAuthenticated';

export const shortsterRoutes = Router();

const createShortsterController = new CreateShortsterController();

shortsterRoutes.post(
  '/',
  checkAuthenticated,
  createShortsterMiddleware,
  createShortsterController.handle,
);
