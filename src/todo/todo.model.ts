export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  priority: Priority;
  isCompleted: boolean;
  task: string;
}
