import { Router } from 'express';

import { usersRoutes } from '../../modules/users/routes/users.routes';
import { sessionsRoutes } from '../../modules/users/routes/sessions.routes';

export const appRoutes = Router();

appRoutes.use('/users', usersRoutes);
appRoutes.use('/session', sessionsRoutes);
