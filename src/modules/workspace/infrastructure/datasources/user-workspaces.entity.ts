import { UserEntity } from "@/modules/auth/domain/entities/user.entity";
import { WorkspaceEntity } from "../../domain/entities/workspace.entitty";

export class UserWorkspacesEntity extends UserEntity {
    workspaces: WorkspaceEntity[];
    constructor({
        workspace,
    }: any) {
        super(workspace)
        this.workspaces = workspace;
    }
}