export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  priority: Priority;
  isCompleted: boolean;
  task: string;
}

export type TodoGetDto = Partial<Omit<Todo, 'task'>>;
export type TodoCreateOneDto = Partial<Omit<Todo, 'id'>>;
export type TodoEditDto = Partial<Todo>;
export type TodoDeleteByIdDto = Pick<Todo, 'id'>;
