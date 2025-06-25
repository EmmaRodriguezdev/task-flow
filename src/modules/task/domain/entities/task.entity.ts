import { TaskPriority } from "../../infrastructure/interfaces/task.interface";

export class TaskEntity {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    priority: TaskPriority,
    assignedTo: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.assignedTo = assignedTo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}