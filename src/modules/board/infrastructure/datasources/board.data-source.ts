import http from "@/core/http";
import { BoardEntity } from "../../domain/entities/board.entity.";
import { TaskStatus } from "@/modules/task/infrastructure/interfaces/task.interface";

export class BoardDataSource {
    async getBoardByWorkspaceId(workspaceId: number): Promise<BoardEntity> {
        try {
            return await http.get(`tasks/workspace/${workspaceId}`) as BoardEntity
        } catch (error) {
            console.log(error)
            throw new Error("Error fetching board by workspace")
        }
    }

    async updateStatusTask(taskId: number, toStatus: TaskStatus) {
        try {
            return await http.put(`tasks/${taskId}/changeStatus`, { status: toStatus })
        } catch (error) {
            console.log(error)
            throw new Error("Error updating status task")
        }
    }
}