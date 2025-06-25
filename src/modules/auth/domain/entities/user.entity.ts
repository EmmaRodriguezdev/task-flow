export class UserEntity {
    id: number;
    name: string;
    lastNamee: string;
    email: string;
    createdAt: string;
    updatedAt: string;

    constructor({
        id,
        name,
        lastName,
        email,
        createdAt,
        updatedAt
    }: any) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.lastNamee = lastName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt
    }
}