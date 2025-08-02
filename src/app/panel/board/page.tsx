"use client";
import { ContentBoard, Filters } from "./components";
import useBoardHook from "@/modules/board/presentation/hooks/board.hook";
import { BoardDataSource } from "@/modules/board/infrastructure/datasources/board.data-source";
import { TaskStatus } from "@/modules/task/infrastructure/interfaces/task.interface";

export default function Board() {
  const boardDataSource = new BoardDataSource();
  const {
    getBoard,
    updateStatusTask: { mutateAsync: updateStatusTask },
  } = useBoardHook(boardDataSource);
  const board = getBoard.data;

  const handleUpdateStatusTask = async (
    taskId: number,
    toStatus: TaskStatus
  ) => {
    await updateStatusTask({ taskId, toStatus });
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="rounded-[8px] w-full h-14 flex flex-wrap items-center">
        <Filters />
      </div>
      <section>
        <ContentBoard
          backlog={board?.BACKLOG || []}
          todo={board?.TODO || []}
          inProgress={board?.IN_PROGRESS || []}
          inReview={board?.IN_REVIEW || []}
          done={board?.DONE || []}
          handleUpdateStatusTask={handleUpdateStatusTask}
          onTaskCreated={() => {
            getBoard.refetch();
          }}
        />
      </section>
    </div>
  );
}
