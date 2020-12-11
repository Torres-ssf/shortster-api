import { Router } from 'express';
import { CreateShortsterController } from '../useCases/CreateShortster/CreateShortsterController';
import { createShortsterMiddleware } from '../useCases/CreateShortster/createShortsterMiddleware';

export const shortsterRoutes = Router();

const createShortsterController = new CreateShortsterController();

shortsterRoutes.post(
  '/',
  createShortsterMiddleware,
  createShortsterController.handle,
);
