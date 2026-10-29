import { inject, Injectable } from '@angular/core';
import { User, UserData } from '../domain/model/user';
import { UserRepository } from '../domain/repositories/user.repository';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly repository = inject(UserRepository);
  list(): readonly User[] {
    return this.repository.findAll();
  }
  get(id: string): User {
    const user = this.repository.findById(id);
    if (!user) throw new Error('El usuario no existe o fue eliminado.');
    return user;
  }
  create(data: UserData): void {
    this.ensureUniqueUsername(data.username);
    this.repository.save(new User(crypto.randomUUID(), data));
  }
  update(id: string, data: UserData): void {
    this.get(id);
    this.ensureUniqueUsername(data.username, id);
    this.repository.save(new User(id, data));
  }
  delete(id: string): void {
    this.get(id);
    this.repository.delete(id);
  }
  private ensureUniqueUsername(username: string, exceptId?: string): void {
    if (
      this.list().some(
        (user) =>
          user.id !== exceptId &&
          user.username.toLocaleLowerCase() === username.trim().toLocaleLowerCase(),
      )
    ) {
      throw new Error('Este nombre de usuario ya está registrado.');
    }
  }
}
