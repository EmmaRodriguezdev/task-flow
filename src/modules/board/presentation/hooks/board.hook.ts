"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BoardDataSource } from "../../infrastructure/datasources/board.data-source";
import { TransactQueryKeysBoard } from "@/core/transact-query-keys";
import { BoardRepository } from "../../infrastructure/repositories/board.repository";
import { useState } from "react";
import { TaskStatus } from "@/modules/task/infrastructure/interfaces/task.interface";

export default function useBoardHook(boardDataSource: BoardDataSource) {
  const [list, setList] = useState<number[]>();
  const boardRepository = new BoardRepository(boardDataSource);
  const getBoard = useQuery({
    queryKey: [TransactQueryKeysBoard.BOARD],
    queryFn: async () => await boardRepository.getBoardByWorkspaceId(1),
  });

  const updateStatusTask = useMutation({
    mutationKey: [TransactQueryKeysBoard.UPDATE_STATUS_TASK],
    mutationFn: async (obj: { taskId: number; toStatus: TaskStatus }) =>
      await boardRepository.updateStatusTask(obj.taskId, obj.toStatus),
  });

  return {
    getBoard,
    setList,
    list,
    updateStatusTask
  };
}
