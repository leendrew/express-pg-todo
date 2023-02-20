export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  priority: Priority;
  isCompleted: boolean;
  task: string;
}

type TodoParams = Pick<Todo, 'id'>;
type TodoQuery = Partial<Omit<Todo, 'id'>>;
type TodoBody = Omit<Todo, 'id'>;

export type TodoGetQueryDto = Omit<TodoQuery, 'task'>;
export type TodoGetParamsDto = TodoParams;
export type TodoCreateOneQueryDto = Pick<Todo, 'task'> & Omit<TodoQuery, 'task'>;
export type TodoEditQueryDto = Pick<Todo, 'id'>;
export type TodoEditBodyDto = Partial<TodoBody>;
export type TodoDeleteByIdParamsDto = TodoParams;
