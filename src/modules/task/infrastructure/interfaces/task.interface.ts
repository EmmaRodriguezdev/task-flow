import { IBasicData } from "@/core/types/utils";

export enum TaskStatus {
    BACKLOG = "BACKLOG",
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    IN_REVIEW = "IN_REVIEW",
    DONE = "DONE",
}

export enum TaskStatusesNames {
    BACKLOG = "Backlog",
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    IN_REVIEW = "In Review",
    DONE = "Done",
}

export enum TaskPriority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
}

export interface IUser extends IBasicData {
    name: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface ITask extends IBasicData {
    title: string;
    description: string;
    status: TaskStatus;
    worskpaceId: number;
    parentId: number | null;
    priority: TaskPriority;
    assignedTo: number;
    createdBy: number;
    updatedBy: number | null;
    creator: IUser;
    assignee: IUser;
}