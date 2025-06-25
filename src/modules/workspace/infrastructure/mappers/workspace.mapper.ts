import { WorkspaceEntity } from "../../domain/entities/workspace.entitty";
import { IWorkspaceResponse } from "../interfaces/workspace.entity";

export class WorkspaceMapper {
    static parseSingleObject(data: IWorkspaceResponse) {
        return new WorkspaceEntity(data)
    }
}