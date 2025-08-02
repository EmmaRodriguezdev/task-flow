import { FormCreateTaskType } from "../../presentation/components/task-form.hook";
import { TaskDataSource } from "../datasources/task.data-source";
import { IResponseCohereAI } from "../interfaces/cohereai.interface";

export class TaskRepository {
  private taskDataSource: TaskDataSource;
  constructor(taskDataSource: TaskDataSource) {
    this.taskDataSource = taskDataSource;
  }

  public async generateTask(context: string): Promise<IResponseCohereAI> {
    return this.taskDataSource.generateTaskByCohere(context);
  }

  public async createTask(data: FormCreateTaskType) {
    return this.taskDataSource.createTask(data);
  }
}
