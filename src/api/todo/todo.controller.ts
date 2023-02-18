import type { Request, Response } from 'express';
import type { TodoRepository } from './todo.repository.js';
import type { TodoGetDto, TodoCreateOneDto, TodoEditDto, TodoDeleteByIdDto } from './todo.model.js';

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public get = async (req: Request<never, never, never, TodoGetDto>, res: Response) => {
    const params = req.query;
    if (params.isCompleted || params.priority) {
      const result = await this.todoRepository.getByParams(params);
      return res.json(result);
    }
    const result = await this.todoRepository.getAll();
    return res.json(result);
  };

  public createOne = async (req: Request<never, never, TodoCreateOneDto>, res: Response) => {
    const todo = req.body;
    const createdTodo = await this.todoRepository.createOne(todo);

    return res.json(createdTodo);
  };

  public edit = async (req: Request<never, never, TodoEditDto>, res: Response) => {
    const todo = req.body;
    const editedTodo = await this.todoRepository.editById(todo);

    return res.json(editedTodo);
  };

  public deleteById = async (req: Request<TodoDeleteByIdDto>, res: Response) => {
    const { params } = req;
    const deletedTodo = await this.todoRepository.deleteById(params);

    return res.json(deletedTodo);
  };

  public deleteCompleted = async (req: Request, res: Response) => {
    const result = await this.todoRepository.deleteCompleted();

    return res.json(result);
  };
}
