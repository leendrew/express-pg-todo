import type { Request, Response } from 'express';
import type { TodoRepository } from './todo.repository.js';
import type {
  TodoGetQueryDto,
  TodoGetParamsDto,
  TodoCreateOneQueryDto,
  TodoEditQueryDto,
  TodoEditBodyDto,
  TodoDeleteByIdParamsDto,
} from './todo.model.js';

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public get = async (req: Request<never, never, never, TodoGetQueryDto>, res: Response) => {
    const { query } = req;
    const todos = await this.todoRepository.get(query);

    return res.json(todos);
  };

  public getById = async (req: Request<TodoGetParamsDto>, res: Response) => {
    const id = req.params;
    const todo = await this.todoRepository.get(id);

    return res.json(todo);
  };

  public createOne = async (req: Request<never, never, TodoCreateOneQueryDto>, res: Response) => {
    const todo = req.body;
    const createdTodo = await this.todoRepository.createOne(todo);

    return res.json(createdTodo);
  };

  public edit = async (req: Request<TodoEditQueryDto, never, TodoEditBodyDto>, res: Response) => {
    const { params, body } = req;
    const todo = { ...body, ...params };
    const result = await this.todoRepository.editById(todo);

    return res.json(result);
  };

  public deleteById = async (req: Request<TodoDeleteByIdParamsDto>, res: Response) => {
    const id = req.params;
    const result = await this.todoRepository.deleteById(id);

    return res.json(result);
  };

  public deleteCompleted = async (req: Request, res: Response) => {
    const result = await this.todoRepository.deleteCompleted();

    return res.json(result);
  };
}
