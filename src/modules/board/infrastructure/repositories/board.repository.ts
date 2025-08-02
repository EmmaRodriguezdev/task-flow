import { TaskStatus } from "@/modules/task/infrastructure/interfaces/task.interface";
import { BoardEntity } from "../../domain/entities/board.entity.";
import { BoardDataSource } from "../datasources/board.data-source";

export class BoardRepository {
    private boardDataSource: BoardDataSource
    constructor(boardDataSource: BoardDataSource) {
        this.boardDataSource = boardDataSource
    }
    async getBoardByWorkspaceId(workspaceId: number | null): Promise<BoardEntity> {
        return this.boardDataSource.getBoardByWorkspaceId(workspaceId)
    }

    async updateStatusTask(taskId: number, toStatus: TaskStatus) {
        return this.boardDataSource.updateStatusTask(taskId, toStatus)
    }
}