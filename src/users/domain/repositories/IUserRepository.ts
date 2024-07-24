import { User } from "../entities/User";

export interface IuserRepository {
    findByUsername(username: string): Promise<User | null>;
    addUser(username: string, password: string): Promise<User>;
}