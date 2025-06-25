"use client";
import { ContentBoard } from "./components";
import useBoardHook from "@/modules/board/presentation/hooks/board.hook";
import { BoardDataSource } from "@/modules/board/infrastructure/datasources/board.data-source";
import { TaskStatus } from "@/modules/task/infrastructure/interfaces/task.interface";

export default function Board() {
  const boardDataSource = new BoardDataSource();
  const {
    getBoard: { data: board, isLoading: isLoadingBoard },
    setList,
    list,
    updateStatusTask: {
      mutateAsync: updateStatusTask,
      isPending: isUpdatingStatusTask,
    },
  } = useBoardHook(boardDataSource);

  const handleUpdateStatusTask = async (
    taskId: number,
    toStatus: TaskStatus
  ) => {
    await updateStatusTask({ taskId, toStatus });
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="border border-gray-200 rounded-[8px] w-full h-14">
        FILTROS
      </div>
      <section>
        <ContentBoard
          backlog={board?.backlog || []}
          todo={board?.todo || []}
          inProgress={board?.inProgress || []}
          inReview={board?.inReview || []}
          done={board?.done || []}
          handleUpdateStatusTask={handleUpdateStatusTask}
        />
      </section>
    </div>
  );
}
