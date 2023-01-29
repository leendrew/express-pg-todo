/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { TodoController } from './todo.controller.js';
import { TodoRepository } from './todo.repository.js';
import { dbService } from '../db.service.js';

const todoRouter = Router();
const todoRepository = new TodoRepository(dbService);
const todoController = new TodoController(todoRepository);

todoRouter.get('/', todoController.get);
todoRouter.post('/', todoController.createOne);
todoRouter.put('/:id', todoController.edit);
todoRouter.delete('/', todoController.deleteCompleted);
todoRouter.delete('/:id', todoController.deleteById);

export { todoRouter };
