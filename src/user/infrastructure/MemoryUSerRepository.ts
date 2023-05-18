import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

const users: User[] = [
  {
    id: "1",
    email: "ali.lopez37@gmail.com",
  },
  {
    id: "1",
    email: "ali.lopez37@gmail.com",
  },
];
export class MemoryUserRepository implements UserRepository {
  async getById(userId: string): Promise<User | null> {
    const user = users.find((user) => user.id === userId);

    if (!user) return null;
    return new User(user.id, user.email);
  }
}
