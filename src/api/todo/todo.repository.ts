import type { Repository } from 'typeorm';
import { Todo } from './todo.entity.js';
import type { TodoGetDto, TodoCreateOneDto, TodoEditDto, TodoDeleteByIdDto } from './todo.model.js';

export class TodoRepository {
  constructor(private readonly repository: Repository<Todo>) {}

  async get(params: TodoGetDto) {
    const res = await this.repository.find({
      where: params,
    });

    return res;
  }

  async createOne(todo: TodoCreateOneDto) {
    const newTodo = this.repository.create(todo);
    const res = await this.repository.save(newTodo);

    return res;
  }

  async editById(todo: TodoEditDto) {
    const res = await this.repository
      .createQueryBuilder()
      .update(Todo)
      .set(todo)
      .where('id=:id', { id: todo.id })
      .execute();

    return res;
  }

  async deleteById(id: TodoDeleteByIdDto) {
    const res = await this.repository
      .createQueryBuilder()
      .delete()
      .from(Todo)
      .where('id=:id', id)
      .execute();

    return res;
  }

  async deleteCompleted() {
    const res = await this.repository
      .createQueryBuilder()
      .delete()
      .from(Todo)
      .where('isCompleted=true')
      .execute();

    return res;
  }
}
