import { Router } from 'express';
import { todoRouter } from './todo/todo.router.js';

const router = Router();

router.get('/ping', (req, res) => res.json('pong'));
router.use('/todo', todoRouter);

export { router };
