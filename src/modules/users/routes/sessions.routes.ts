import { Router } from 'express';
import { CreateSessionController } from '../useCases/CreateSession/CreateSessionController';

export const sessionsRoutes = Router();

const createSessionController = new CreateSessionController();

sessionsRoutes.post('/', createSessionController.handle);
