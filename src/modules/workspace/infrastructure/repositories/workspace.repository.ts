import { WorkspaceEntity } from "../../domain/entities/workspace.entitty";
import { WorkspaceDataSource } from "../datasources/workspace.data-source";

export class WorkspaceRepository {
    private workspaceDataSource: WorkspaceDataSource
    constructor(workspaceDataSource: WorkspaceDataSource) {
        this.workspaceDataSource = workspaceDataSource
    }

    async getWorkspacesByUserId(userId: number): Promise<WorkspaceEntity[]> {
        return this.workspaceDataSource.getWorkspacesByUserId(userId)
    }

}