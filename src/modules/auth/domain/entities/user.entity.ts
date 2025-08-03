export class UserEntity {
    id: number;
    name: string;
    lastName: string;
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
    }: UserEntity) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.lastName = lastName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt
    }
}