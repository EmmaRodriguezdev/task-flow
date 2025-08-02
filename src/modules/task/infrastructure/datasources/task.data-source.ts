import http from "@/core/http";
import { IResponseCohereAI } from "../interfaces/cohereai.interface";
import sonner from "@/lib/sonner";
import { SonnerType } from "@/core/types/enums";
import { FormCreateTaskType } from "../../presentation/components/task-form.hook";

export class TaskDataSource {
  public async generateTaskByCohere(
    context: string
  ): Promise<IResponseCohereAI> {
    try {
      const response = (await http.post("cohereai/generate-task", {
        context,
      })) as IResponseCohereAI;
      if (response.message.content.length === 0)
        throw Error("No es posible generar la tarea");
      return response;
    } catch (err) {
      console.log(err);
      sonner("Error al generar tarea", SonnerType.ERROR);
      throw new Error("Error generating task");
    }
  }

  public async createTask(data: FormCreateTaskType) {
    try {
      return await http.post("tasks/create", data);
    } catch (error) {
      sonner("Error al crear tarea", SonnerType.ERROR);
    }
  }
}
