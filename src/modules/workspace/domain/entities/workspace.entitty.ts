import { IWorkspaceResponse } from "../../infrastructure/interfaces/workspace.entity";

export class WorkspaceEntity {
    id: number;
    ownerId?: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;

    constructor({
        id,
        ownerId,
        name,
        createdAt,
        updatedAt
    }: IWorkspaceResponse) { 
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
     }

}