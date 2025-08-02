import {
  TaskPriority,
  TaskStatus,
} from "@/modules/task/infrastructure/interfaces/task.interface";
import z from "zod";

export const generateTaskSchema = z
  .object({
    context: z
      .string({ required_error: "Necesito un contexto" })
      .min(1, { message: "Necesito un contexto" }),
  })
  .required();

export const createTaskSchema = z.object({
  title: z
    .string({ required_error: "El título es requerido" })
    .min(1, { message: "El título es requerido" }),

  description: z.string().optional(),

  status: z.nativeEnum(TaskStatus, {
    required_error: "El estatus es requerido",
    invalid_type_error: "El estatus no es válido",
  }),

  workspaceId: z
    .number(),

  assignedTo: z.string().optional(),

  priority: z.nativeEnum(TaskPriority, {
    required_error: "La prioridad es requerida",
    invalid_type_error: "La prioridad no es válida",
  }),
});
