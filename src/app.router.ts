import type { Router } from 'express';
import type { TodoRouter } from './api/todo/todo.router.js';

export class AppRouter {
  constructor(public readonly router: Router, private readonly todoRouter: TodoRouter) {
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use('/todo', this.todoRouter.router);
    this.router.get('/ping', (req, res) => res.json('pong'));
  }
}
