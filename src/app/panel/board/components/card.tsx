import { ITask } from "@/modules/task/infrastructure/interfaces/task.interface";
import { ShieldAlert, ShieldCheck, Shield } from "lucide-react";
import { TaskPriority } from "@/modules/task/infrastructure/interfaces/task.interface";

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
      className={`relative flex h-56 w-full flex-col justify-between rounded-lg border ${
        task.priority === TaskPriority.HIGH.toUpperCase()
          ? "border-red-intense bg-red-light"
          : task.priority === TaskPriority.MEDIUM.toUpperCase()
          ? "border-blue-light bg-blue-light"
          : "border-green-intense bg-green-light"
      } p-4 shadow-md cursor-pointer`}
      data-id={id}
    >
      <div className="flex flex-col gap-4 p-2">
        <section className="flex flex-col gap-2">
          <h1 className="text-xl font-bold truncate">{task.title}</h1>
          <p className="text-md font-medium truncate">{task.description}</p>
        </section>
        <section className="flex flex-col gap-2">
          <label className="text-sm flex items-center gap-2">
            <PriorityIcon />
            {task.priority}
          </label>
          <label className="text-sm">
            {task.assignee
              ? `${task.assignee.name} ${task.assignee.lastName}`
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
