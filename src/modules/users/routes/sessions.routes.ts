import { Router } from 'express';
import { createSessionMiddleware } from '../useCases/CreateSession/createSessionMiddleware';
import { CreateSessionController } from '../useCases/CreateSession/CreateSessionController';

export const sessionsRoutes = Router();

const createSessionController = new CreateSessionController();

sessionsRoutes.post(
  '/',
  createSessionMiddleware,
  createSessionController.handle,
);
