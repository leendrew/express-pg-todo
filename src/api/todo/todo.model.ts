export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  priority: Priority;
  isCompleted: boolean;
  task: string;
}

export type TodoGetDto = Partial<Pick<Todo, 'isCompleted' | 'priority'>>;
export type TodoCreateOneDto = Partial<Todo>;
export type TodoEditDto = Partial<Todo>;
export type TodoDeleteByIdDto = Pick<Todo, 'id'>;
