import { Router } from 'express';
import { createUserMiddleware } from '../useCases/createUserMiddleware';
import { CreateUserController } from '../useCases/CreateUserController';

export const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', createUserMiddleware, createUserController.handle);
