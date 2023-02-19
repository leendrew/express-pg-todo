import type { Request, Response } from 'express';
import type { TodoRepository } from './todo.repository.js';
import type { TodoGetDto, TodoCreateOneDto, TodoEditDto, TodoDeleteByIdDto } from './todo.model.js';

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public get = async (req: Request<never, never, never, TodoGetDto>, res: Response) => {
    const { query } = req;
    const todos = await this.todoRepository.get(query);
    return res.json(todos);
  };

  public createOne = async (req: Request<never, never, TodoCreateOneDto>, res: Response) => {
    const todo = req.body;
    const createdTodo = await this.todoRepository.createOne(todo);

    return res.json(createdTodo);
  };

  public edit = async (req: Request<never, never, TodoEditDto>, res: Response) => {
    const todo = req.body;
    const result = await this.todoRepository.editById(todo);

    return res.json(result);
  };

  public deleteById = async (req: Request<TodoDeleteByIdDto>, res: Response) => {
    const { params } = req;
    const result = await this.todoRepository.deleteById(params);

    return res.json(result);
  };

  public deleteCompleted = async (req: Request, res: Response) => {
    const result = await this.todoRepository.deleteCompleted();

    return res.json(result);
  };
}
