import { Injectable } from '@angular/core';
import { User, UserData } from '../domain/model/user';
import { UserRepository } from '../domain/repositories/user.repository';

const INITIAL_USERS: UserData[] = [
  { username: 'j.perez', firstName: 'Juan', lastName: 'Pérez', sex: 'Masculino' },
  { username: 'm.garcia', firstName: 'María', lastName: 'García', sex: 'Femenino' },
  { username: 't.ruiz', firstName: 'Tomás', lastName: 'Ruiz', sex: 'Masculino' },
  { username: 'a.lopez', firstName: 'Ana', lastName: 'López', sex: 'Femenino' },
  { username: 'c.gomez', firstName: 'Carlos', lastName: 'Gómez', sex: 'Masculino' },
  { username: 'n.aliaga', firstName: 'Nicole', lastName: 'Aliaga', sex: 'Femenino' },
];

@Injectable()
export class InMemoryUserRepository extends UserRepository {
  private users = INITIAL_USERS.map((data, index) => new User(String(index + 1), data));
  findAll(): readonly User[] {
    return [...this.users];
  }
  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
  save(user: User): void {
    const index = this.users.findIndex((current) => current.id === user.id);
    if (index < 0) this.users = [user, ...this.users];
    else this.users = this.users.map((current) => (current.id === user.id ? user : current));
  }
  delete(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
