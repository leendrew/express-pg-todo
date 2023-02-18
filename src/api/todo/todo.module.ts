import { Router } from 'express';
import { TodoRouter } from './todo.router.js';
import { TodoController } from './todo.controller.js';
import { TodoRepository } from './todo.repository.js';
import { dbService } from '../../db/db.service.js';
import { Todo } from './todo.entity.js';

// TODO: try catch
const todoRepository = new TodoRepository(dbService.getRepository(Todo));
const todoController = new TodoController(todoRepository);
export const todoRouter = new TodoRouter(Router(), todoController);
