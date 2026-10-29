import { User } from '../model/user';

export abstract class UserRepository {
  abstract findAll(): readonly User[];
  abstract findById(id: string): User | undefined;
  abstract save(user: User): void;
  abstract delete(id: string): void;
}
