import http from "@/core/http";
import { BoardEntity } from "../../domain/entities/board.entity.";
import { TaskStatus } from "@/modules/task/infrastructure/interfaces/task.interface";
import sonner from "@/lib/sonner";
import { SonnerType } from "@/core/types/enums";

export class BoardDataSource {
    async getBoardByWorkspaceId(workspaceId: number | null): Promise<BoardEntity> {
        try {
            if (!workspaceId) {
                sonner('Selecciona un workspace', SonnerType.ERROR)
                return new BoardEntity([], [], [], [], []);
            }
            return await http.get(`tasks/workspace/${workspaceId}`) as BoardEntity
        } catch (error) {
            console.log(error)
            throw new Error("Error fetching board by workspace")
        }
    }

    async updateStatusTask(taskId: number, toStatus: TaskStatus) {
        try {
            return await http.put(`tasks/update-status/${taskId}`, { toStatus: toStatus })
        } catch (error) {
            console.log(error)
            throw new Error("Error updating status task")
        }
    }
}