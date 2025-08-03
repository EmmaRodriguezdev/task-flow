"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import {
  FormCreateTaskType,
  FormGenerateTaskType,
} from "@/modules/task/presentation/components/task-form.hook";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useTasksHook from "@/modules/task/presentation/hooks/task.hook";
import { TaskDataSource } from "@/modules/task/infrastructure/datasources/task.data-source";
import { useRef, useState } from "react";
import TextEditor from "@/components/ui/textEditor";
import CustomSelect from "@/components/ui/custom-select";
import {
  TaskPriority,
  TaskStatus,
} from "@/modules/task/infrastructure/interfaces/task.interface";
import CustomCheckbox from "@/components/ui/checkbox";
import { cleanGenerateText } from "@/lib/utils";

export default function CreateTask(props: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  generateTaskForm: UseFormReturn<FormGenerateTaskType>;
  createTaskForm: UseFormReturn<FormCreateTaskType>;
  setTypedText: React.Dispatch<React.SetStateAction<string>>;
  typedText: string;
  setFullText: React.Dispatch<React.SetStateAction<string>>;
  finishTyping: boolean;
  fullText: string;
  onTaskCreated?: () => void;
}) {
  const {
    generateTaskForm,
    onOpenChange,
    open,
    createTaskForm,
    setTypedText,
    typedText,
    setFullText,
    finishTyping,
    onTaskCreated,
  } = props;
  const [createWithAI, setCreateWithAI] = useState(true);
  const taskDataSourceRef = useRef(new TaskDataSource());
  const {
    generateTask: {
      mutateAsync: generateTaskMutate,
      isPending: generatePending,
    },
    createTask: { mutateAsync: createTaskMutate, isPending: createPending },
  } = useTasksHook(taskDataSourceRef.current);

  const handleGenerateTask = async (values: FormGenerateTaskType) => {
    setTypedText("");
    const result = await generateTaskMutate({ context: values.context });
    const cleanText = cleanGenerateText(result?.message.content[0].text || "");
    createTaskForm.setValue("description", cleanText);
    setFullText(cleanText);
  };

  const handleCreateTask = async (values: FormCreateTaskType) => {
    values.description = typedText;
    await createTaskMutate(values);
    onOpenChange(false);
    if (onTaskCreated) {
      onTaskCreated();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-h-screen min-h-screen h-screen min-w-[40vw] overflow-y-auto flex flex-col rounded-[12px] gap-[14px] right-[-20%]">
        <DialogTitle>Crear nueva tarea</DialogTitle>
        <DialogDescription className="text-[16px]/[14px]">
          Para crear una nueva tarea con{" "}
          <span className="text-blue-medium font-bold">IAFLOW</span> agrega el
          contexto
        </DialogDescription>
        <div className="flex-1 items-center space-y-10">
          <div className="h-[70vh]">
            <TextEditor
              value={typedText}
              setValue={setTypedText}
              generatePending={generatePending}
              finishTyping={finishTyping}
            />
          </div>
          <section className="w-full space-y-[40px] flex justify-center items-start flex-col">
            <div>
              <CustomCheckbox
                label="Crear con AIFLOW"
                setValue={setCreateWithAI}
              />
            </div>

            <Form {...createTaskForm}>
              <FormField
                control={createTaskForm.control}
                name="title"
                render={({}) => (
                  <FormItem className="w-full">
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e) => {
                          createTaskForm.setValue("title", e.target.value);
                          generateTaskForm.setValue("context", e.target.value);
                        }}
                        placeholder="Crea una tarea de ejemplo"
                      />
                    </FormControl>
                    <FormMessage>
                      {createWithAI
                        ? generateTaskForm.formState.errors.context?.message
                        : createTaskForm.formState.errors.title?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid w-full gap-2 grid-cols-3">
                <FormField
                  control={createTaskForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomSelect
                          placeholder="Estatus"
                          options={Object.values(TaskStatus).map((status) => {
                            return {
                              value: status,
                              label: status,
                            };
                          })}
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage>
                        {createTaskForm.formState.errors.status?.message &&
                          "El estatus es requerido"}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={createTaskForm.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomSelect
                          placeholder="Prioridad"
                          options={Object.values(TaskPriority).map(
                            (priority) => {
                              return {
                                value: priority,
                                label: priority,
                              };
                            }
                          )}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        />
                      </FormControl>
                      <FormMessage>
                        {typeof createTaskForm.formState.errors.priority
                          ?.message === "string" &&
                          createTaskForm.formState.errors.priority?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={createTaskForm.control}
                  name="assignedTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <CustomSelect
                          placeholder="Asignar a"
                          options={[{ value: 1, label: "Ema" }]}
                          onValueChange={field.onChange}
                          defaultValue={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage>
                        {createTaskForm.formState.errors.assignedTo?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={generatePending || createPending}
                  variant="yellow"
                  onClick={
                    createTaskForm.getValues("description")
                      ? createTaskForm.handleSubmit(handleCreateTask)
                      : createWithAI
                      ? generateTaskForm.handleSubmit(handleGenerateTask)
                      : createTaskForm.handleSubmit(handleCreateTask)
                  }
                  className="w-full"
                  type="submit"
                >
                  {createPending || generatePending
                    ? "Cargando..."
                    : createWithAI &&
                      typedText.replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, "") === ""
                    ? "Generar"
                    : "Crear"}
                </Button>
              </div>
            </Form>
          </section>
        </div>
        <div></div>
      </DialogContent>
    </Dialog>
  );
}

// typedText.replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, "")
