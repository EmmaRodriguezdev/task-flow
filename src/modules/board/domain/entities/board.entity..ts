import { ITask } from "@/modules/task/infrastructure/interfaces/task.interface";

export class BoardEntity {
  BACKLOG: ITask[];
  TODO: ITask[];
  IN_PROGRESS: ITask[];
  IN_REVIEW: ITask[];
  DONE: ITask[];

  constructor(
    BACKLOG: ITask[],
    TODO: ITask[],
    IN_PROGRESS: ITask[],
    IN_REVIEW: ITask[],
    DONE: ITask[]
  ) {
    this.BACKLOG = BACKLOG;
    this.TODO = TODO;
    this.IN_PROGRESS = IN_PROGRESS;
    this.IN_REVIEW = IN_REVIEW;
    this.DONE = DONE;
  }
}