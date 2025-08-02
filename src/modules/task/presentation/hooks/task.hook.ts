import { TanstackQueryKeysTask } from "@/core/transact-query-keys";
import { useMutation } from "@tanstack/react-query";
import { TaskRepository } from "../../infrastructure/repositories/task.repository";
import { TaskDataSource } from "../../infrastructure/datasources/task.data-source";
import { FormCreateTaskType } from "../components/task-form.hook";

export default function useTasksHook(taskDataSource: TaskDataSource) {
  const taskRepository = new TaskRepository(taskDataSource);
  const generateTask = useMutation({
    mutationKey: [TanstackQueryKeysTask.GENERATE_TASK],
    mutationFn: async (obj: { context: string }) =>
      taskRepository.generateTask(obj.context),
  });
  const createTask = useMutation({
    mutationKey: [TanstackQueryKeysTask.CREATE_TASK],
    mutationFn: async (obj: FormCreateTaskType) => taskRepository.createTask(obj),
  });
  return {
    generateTask,
    createTask,
  };
}
