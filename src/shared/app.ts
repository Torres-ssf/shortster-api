import 'reflect-metadata';

import './database/index';

import './container';

import express, { json } from 'express';

import { expressErrorMiddleware } from './middlewares/expressErrorMiddleware';

import { appRoutes } from './routes';

const app = express();

app.use(json());

app.use(appRoutes);

app.use(expressErrorMiddleware);

export { app };
