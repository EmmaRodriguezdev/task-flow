import CardTask from "./card";
import {
  ITask,
  TaskStatus,
  TaskStatusesNames,
} from "@/modules/task/infrastructure/interfaces/task.interface";
import { useEffect, useRef } from "react";
import Sortable from "sortablejs";

export default function ContentBoard({
  backlog,
  todo,
  inProgress,
  inReview,
  done,
  handleUpdateStatusTask,
}: {
  backlog: ITask[];
  todo: ITask[];
  inProgress: ITask[];
  inReview: ITask[];
  done: ITask[];
  handleUpdateStatusTask: (taskId: number, toStatus: TaskStatus) => void;
}) {
  const backlogRef = useRef<HTMLDivElement>(null);
  const todoRef = useRef<HTMLDivElement>(null);
  const inProgressRef = useRef<HTMLDivElement>(null);
  const inReviewRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containers = [
      backlogRef,
      todoRef,
      inProgressRef,
      inReviewRef,
      doneRef,
    ];

    containers.forEach((ref) => {
      if (ref.current) {
        Sortable.create(ref.current, {
          group: "tasks",
          animation: 150,
          ghostClass: "sortable-ghost",
          chosenClass: "sortable-chosen",
          onAdd: async (event) => {
            const toColumn = event.to.dataset["column"];
            const taskId = event.item.dataset["id"];
            await handleUpdateStatusTask(
              Number(taskId),
              toColumn as TaskStatus
            );
          },
        });
      }
    });
  }, [backlog, todo, inProgress, inReview, done]);

  return (
    <div className="w-full h-fit border border-gray-200 rounded-[8px]">
      <div className="grid grid-cols-5 gap-[10px] p-2">
        <div className="flex flex-col gap-[10px]">
          <div className="p-4 bg-black text-white rounded-[8px] text-center">
            <label className="text-lg font-bold">
              {TaskStatusesNames.BACKLOG}
            </label>
          </div>
          <div
            ref={backlogRef}
            data-column={TaskStatus.BACKLOG.toUpperCase()}
            className="flex flex-col gap-[10px] min-h-screen p-2 border-2 border-dashed border-gray-300 rounded-lg"
          >
            {backlog?.map((task) => (
              <CardTask key={task.id} task={task} id={task.id} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="p-4 bg-black text-white rounded-[8px] text-center">
            <label className="text-lg font-bold">
              {TaskStatusesNames.TODO}
            </label>
          </div>
          <div
            ref={todoRef}
            data-column={TaskStatus.TODO.toUpperCase()}
            className="flex flex-col gap-[10px] min-h-screen p-2 border-2 border-dashed border-gray-300 rounded-lg"
          >
            {todo?.map((task) => (
              <CardTask key={task.id} task={task} id={task.id} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="p-4 bg-black text-white rounded-[8px] text-center">
            <label className="text-lg font-bold">
              {TaskStatusesNames.IN_PROGRESS}
            </label>
          </div>
          <div
            ref={inProgressRef}
            data-column={TaskStatus.IN_PROGRESS.toUpperCase()}
            className="flex flex-col gap-[10px] min-h-screen p-2 border-2 border-dashed border-gray-300 rounded-lg"
          >
            {inProgress?.map((task) => (
              <CardTask key={task.id} task={task} id={task.id} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="p-4 bg-black text-white rounded-[8px] text-center">
            <label className="text-lg font-bold">
              {TaskStatusesNames.IN_REVIEW}
            </label>
          </div>
          <div
            ref={inReviewRef}
            data-column={TaskStatus.IN_REVIEW.toUpperCase()}
            className="flex flex-col gap-[10px] min-h-screen p-2 border-2 border-dashed border-gray-300 rounded-lg"
          >
            {inReview?.map((task) => (
              <CardTask key={task.id} task={task} id={task.id} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="p-4 bg-black text-white rounded-[8px] text-center">
            <label className="text-lg font-bold">
              {TaskStatusesNames.DONE}
            </label>
          </div>
          <div
            ref={doneRef}
            data-column={TaskStatus.DONE.toUpperCase()}
            className="flex flex-col gap-[10px] min-h-screen p-2 border-2 border-dashed border-gray-300 rounded-lg"
          >
            {done?.map((task) => (
              <CardTask key={task.id} task={task} id={task.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
