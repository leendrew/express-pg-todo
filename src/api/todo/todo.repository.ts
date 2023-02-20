import type { Repository } from 'typeorm';
import { Todo } from './todo.entity.js';
import type {
  TodoGetQueryDto,
  TodoGetParamsDto,
  TodoCreateOneQueryDto,
  TodoEditQueryDto,
  TodoEditBodyDto,
  TodoDeleteByIdParamsDto,
} from './todo.model.js';

export class TodoRepository {
  constructor(private readonly repository: Repository<Todo>) {}

  public async get(params: TodoGetParamsDto | TodoGetQueryDto) {
    const res = await this.repository.find({
      where: params,
    });

    return res;
  }

  public async createOne(todo: TodoCreateOneQueryDto) {
    const newTodo = this.repository.create(todo);
    const res = await this.repository.save(newTodo);

    return res;
  }

  public async editById(todo: TodoEditQueryDto & TodoEditBodyDto) {
    const res = await this.repository
      .createQueryBuilder()
      .update(Todo)
      .set(todo)
      .where('id=:id', { id: todo.id })
      .execute();

    return res;
  }

  public async deleteById(id: TodoDeleteByIdParamsDto) {
    const res = await this.repository
      .createQueryBuilder()
      .delete()
      .from(Todo)
      .where('id=:id', id)
      .execute();

    return res;
  }

  public async deleteCompleted() {
    const res = await this.repository
      .createQueryBuilder()
      .delete()
      .from(Todo)
      .where('isCompleted=true')
      .execute();

    return res;
  }
}
