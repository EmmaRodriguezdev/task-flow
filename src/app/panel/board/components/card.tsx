import { ITask } from "@/modules/task/infrastructure/interfaces/task.interface";
import { ShieldAlert, ShieldCheck, Shield } from "lucide-react";
import { TaskPriority } from "@/modules/task/infrastructure/interfaces/task.interface";
import { cn } from "@/lib/utils";

const CardTask = ({ task, id }: { task: ITask; id: number }) => {
  const PriorityIcon = () => {
    switch (task.priority) {
      case TaskPriority.HIGH.toUpperCase():
        return <ShieldAlert className="text-red-500" />;
      case TaskPriority.MEDIUM.toUpperCase():
        return <ShieldCheck className="text-blue-500" />;
      default:
        return <Shield className="text-green-500" />;
    }
  };

  return (
    <article
      className="relative flex h-56 w-full flex-col justify-between rounded-lg border shadow-md cursor-pointer bg-[#f8f9fa]"
      data-id={id}
    >
      <div
        className={cn(
          "absolute rounded-l-lg left-0 w-[12px] h-full border-2",
          task.priority === TaskPriority.HIGH.toUpperCase() &&
            "border-red-intense bg-red-light",
          task.priority === TaskPriority.MEDIUM.toUpperCase() &&
            "border-blue-outline bg-blue-light",
          task.priority == TaskPriority.LOW.toUpperCase() &&
            "border-green-intense bg-green-light"
        )}
      />
      <div className="flex flex-col gap-4 p-6">
        <section className="flex flex-col gap-2">
          <h1 className="text-xl font-bold truncate">{task.title}</h1>
        </section>
        <section className="flex flex-col gap-2">
          <label className="text-sm flex items-center gap-2">
            <PriorityIcon />
            {task.priority}
          </label>
          <label className="text-sm">
            {task.assignee
              ? `Responsable: ${task.assignee.name} ${task.assignee.lastName}`
              : "Sin asignar"}
          </label>
          <label className="text-sm">
            {task.creator
              ? `Creador: ${task.creator.name} ${task.creator.lastName}`
              : "Sin asignar"}
          </label>
        </section>
        <label className="absolute bottom-2 right-2 text-sm">
          {new Date(task.createdAt).toLocaleDateString()}
        </label>
      </div>
    </article>
  );
};

export default CardTask;
