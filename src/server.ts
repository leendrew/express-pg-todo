import { Router } from 'express';
import { App } from './app.module.js';
import { AppRouter } from './app.router.js';
import { dbService } from './db/db.service.js';
import { config } from './config/config.js';
import { todoRouter } from './api/todo/todo.module.js';

const appRouter = new AppRouter(Router(), todoRouter);
const app = new App(config, appRouter.router, dbService);
app.bootstrap();
