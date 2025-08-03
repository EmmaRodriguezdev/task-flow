
import { UserEntity } from "@/modules/auth/domain/entities/user.entity";
import { WorkspaceEntity } from "./workspace.entitty";

export class UserWorkspacesEntity extends UserEntity {
    workspaces: WorkspaceEntity[];
    constructor(user: UserEntity, workspaces: WorkspaceEntity[]) {
        super(user);
        this.workspaces = workspaces;
    }
}