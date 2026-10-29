import { inject, Injectable } from '@angular/core';
import { UserService } from '../../users/application/user.service';
import { User } from '../../users/domain/model/user';

export function summarizeUsers(users: readonly User[]) {
  const total = users.length;
  const distribution = (['Masculino', 'Femenino'] as const).map((sex) => {
    const count = users.filter((user) => user.sex === sex).length;
    return { sex, count, percentage: total ? Math.round((count / total) * 100) : 0 };
  });
  return { total, distribution };
}

/** Escapa CSV y neutraliza fórmulas al abrir los datos en una hoja de cálculo. */
export function usersToCsv(users: readonly User[]): string {
  const cell = (value: string): string => {
    const safe = /^[\s]*[=+@-]/.test(value) ? `'${value}` : value;
    return `"${safe.replace(/"/g, '""')}"`;
  };
  return (
    '\uFEFF' +
    [
      ['Usuario', 'Nombre', 'Apellido', 'Sexo'],
      ...users.map((user) => [user.username, user.firstName, user.lastName, user.sex]),
    ]
      .map((row) => row.map(cell).join(';'))
      .join('\r\n')
  );
}

@Injectable({ providedIn: 'root' })
export class UserReportService {
  private readonly users = inject(UserService);
  generate() {
    const users = this.users.list();
    return { ...summarizeUsers(users), users };
  }
}
