import http from "@/core/http";
import { WorkspaceEntity } from "../../domain/entities/workspace.entitty";
import { WorkspaceMapper } from "../mappers/workspace.mapper";
import { UserWorkspacesEntity } from "./user-workspaces.entity";

export class WorkspaceDataSource {
  async getWorkspacesByUserId(userId: number): Promise<WorkspaceEntity[]> {
    try {
      const response: UserWorkspacesEntity = await http.get(
        `workspaces/${userId}`
      );
      return response.workspaces.map(WorkspaceMapper.parseSingleObject);
    } catch (err) {
      console.log(err)
      throw new Error("Error fetching workspaces by user");
    }
  }
}