import http from "@/core/http";
import { WorkspaceEntity } from "../../domain/entities/workspace.entitty";
import { WorkspaceMapper } from "../mappers/workspace.mapper";
import { IWorkspaceResponse } from "../interfaces/workspace.entity";

export class WorkspaceDataSource {
  async getWorkspacesByUserId(userId: number): Promise<WorkspaceEntity[]> {
    try {
      const response: IWorkspaceResponse[] = await http.get(
        `workspace/user/${userId}`
      );
      return response.map(WorkspaceMapper.parseSingleObject);
    } catch (err) {
      console.log(err)
      throw new Error("Error fetching workspaces by user");
    }
  }
}