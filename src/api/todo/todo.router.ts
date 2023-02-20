/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Router } from 'express';
import type { TodoController } from './todo.controller.js';

export class TodoRouter {
  constructor(public readonly router: Router, private readonly controller: TodoController) {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get('/', this.controller.get);
    this.router.get('/:id', this.controller.getById);
    this.router.post('/', this.controller.createOne);
    this.router.put('/:id', this.controller.edit);
    this.router.delete('/', this.controller.deleteCompleted);
    this.router.delete('/:id', this.controller.deleteById);
  }
}
