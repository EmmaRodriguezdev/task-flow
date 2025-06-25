import { ITask } from "@/modules/task/infrastructure/interfaces/task.interface";

export class BoardEntity {
  backlog: ITask[];
  todo: ITask[];
  inProgress: ITask[];
  inReview: ITask[];
  done: ITask[];

  constructor(
    backlog: ITask[],
    todo: ITask[],
    inProgress: ITask[],
    inReview: ITask[],
    done: ITask[]
  ) {
    this.backlog = backlog;
    this.todo = todo;
    this.inProgress = inProgress;
    this.inReview = inReview;
    this.done = done;
  }
}