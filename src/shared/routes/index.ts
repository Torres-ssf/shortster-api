import { Router } from 'express';

import { usersRoutes } from '../../modules/users/routes/users.routes';

export const appRoutes = Router();

appRoutes.use('/users', usersRoutes);
