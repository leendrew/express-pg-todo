import { Repository } from 'typeorm';
import type { DBService } from '../db.service.js';
import { Todo } from './todo.entity.js';

export class TodoRepository {
  private readonly repository: Repository<Todo>;

  constructor(private readonly _db: DBService) {
    this.repository = _db.getRepository(Todo);
  }

  async getAll() {
    const res = await this.repository.find();

    return res;
  }

  async getByParams(params: Partial<Todo>) {
    const res = await this.repository.find({
      where: params,
    });

    return res;
  }

  async createOne(todo: Partial<Todo>) {
    const newTodo = this.repository.create({ ...todo });
    const res = await this.repository.save(newTodo);

    return res;
  }

  async editById(todo: Partial<Todo>) {
    const res = await this.repository
      .createQueryBuilder()
      .update(Todo)
      .set({ ...todo })
      .where('id=:id', { id: todo.id })
      .execute();

    return res;
  }

  async deleteById(id: number) {
    const res = await this.repository
      .createQueryBuilder()
      .delete()
      .from(Todo)
      .where('id=:id', { id })
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
