import type { Request, Response } from 'express';
import { TodoRepository } from './todo.repository.js';
import { Todo } from './todo.entity.js';
import type { Priority } from './todo.model.js';

export class TodoController {
  private readonly todoRepository: TodoRepository;

  constructor(private readonly _todoRepository: TodoRepository) {
    this.todoRepository = _todoRepository;
  }

  public get = async (
    req: Request<never, never, never, { isCompleted?: boolean; priority?: Priority }>,
    res: Response,
  ) => {
    const params = req.query;
    let result = null;
    if (params.isCompleted || params.priority) {
      result = await this.todoRepository.getByParams(params);
      return res.json(result);
    }
    result = await this.todoRepository.getAll();
    return res.json(result);
  };

  public createOne = async (req: Request<never, never, Partial<Todo>>, res: Response) => {
    const todo = req.body;
    const isSuccess = await this.todoRepository.createOne(todo);

    return res.json(isSuccess);
  };

  public edit = async (req: Request<never, never, Partial<Todo>>, res: Response) => {
    const todo = req.body;
    const isSuccess = await this.todoRepository.editById(todo);

    return res.json(isSuccess);
  };

  public deleteById = async (req: Request<{ id: Pick<Todo, 'id'> }>, res: Response) => {
    const { id } = req.params;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    const deletedTodo = await this.todoRepository.deleteById(id);

    return res.json(deletedTodo);
  };

  public deleteCompleted = async (req: Request, res: Response) => {
    const result = await this.todoRepository.deleteCompleted();

    return res.json(result);
  };
}
