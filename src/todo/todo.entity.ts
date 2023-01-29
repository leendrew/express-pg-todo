import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import type { Priority } from './todo.model.js';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  task: string;

  @Column({ type: 'timestamp', name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @Column()
  priority: Priority;

  @Column({ name: 'is_completed', default: false })
  isCompleted: boolean;
}
