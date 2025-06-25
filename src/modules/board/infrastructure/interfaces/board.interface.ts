import { ITask } from "@/modules/task/infrastructure/interfaces/task.interface";

export interface IBoardTaskResponse {
  backlog: ITask[];
  todo: ITask[];
  inProgress: ITask[];
  inReview: ITask[];
  done: ITask[];
}
