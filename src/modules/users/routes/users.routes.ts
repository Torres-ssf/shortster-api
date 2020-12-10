import { Router } from 'express';
import { createUserMiddleware } from '../useCases/CreateUser/createUserMiddleware';
import { CreateUserController } from '../useCases/CreateUser/CreateUserController';

export const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', createUserMiddleware, createUserController.handle);
