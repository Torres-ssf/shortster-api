import { Router } from 'express';
import { CreateUserController } from '../useCases/CreateUser/CreateUserController';

export const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle);
