import { Router } from 'express';
import { CreateShortsterController } from '../useCases/CreateShortster/CreateShortsterController';
import { checkAuthenticated } from '../middlewares/checkUserAuthenticated';
import { GetShortsterController } from '../useCases/GetShortster/GetShortsterController';
import { ShortsterStatsController } from '../useCases/ShortsterStats/ShortsterStatsController';

export const shortsterRoutes = Router();

const createShortsterController = new CreateShortsterController();

const getShortsterController = new GetShortsterController();

const shortsterStatsController = new ShortsterStatsController();

shortsterRoutes.post('/', checkAuthenticated, createShortsterController.handle);

shortsterRoutes.get('/:code', getShortsterController.handle);

shortsterRoutes.get('/:code/stats', shortsterStatsController.handle);
