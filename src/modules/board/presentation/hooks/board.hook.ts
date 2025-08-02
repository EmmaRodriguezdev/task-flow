"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BoardDataSource } from "../../infrastructure/datasources/board.data-source";
import { TransactQueryKeysBoard } from "@/core/transact-query-keys";
import { BoardRepository } from "../../infrastructure/repositories/board.repository";
import { useState } from "react";
import { TaskStatus } from "@/modules/task/infrastructure/interfaces/task.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/core/store/store";

export default function useBoardHook(boardDataSource: BoardDataSource) {
  const [list, setList] = useState<number[]>();
  const boardRepository = new BoardRepository(boardDataSource);
  const workspace = useSelector((state: RootState) => state.workspace.workspaceSelected)
  
  const getBoard = useQuery({
    queryKey: [TransactQueryKeysBoard.BOARD, workspace?.id],
    queryFn: async () => await boardRepository.getBoardByWorkspaceId(workspace?.id || null),
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
