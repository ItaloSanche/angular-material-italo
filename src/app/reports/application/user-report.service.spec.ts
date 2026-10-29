import { User } from '../../users/domain/model/user';
import { summarizeUsers, usersToCsv } from './user-report.service';

describe('Reporte de usuarios', () => {
  it('calcula cantidades y porcentajes a partir de los usuarios actuales', () => {
    const users = [
      new User('1', { username: 'ana', firstName: 'Ana', lastName: 'Díaz', sex: 'Femenino' }),
      new User('2', { username: 'juan', firstName: 'Juan', lastName: 'Pérez', sex: 'Masculino' }),
    ];
    const report = summarizeUsers(users);
    expect(report.total).toBe(2);
    expect(report.distribution.map((item) => item.percentage)).toEqual([50, 50]);
    expect(summarizeUsers(users.slice(0, 1)).distribution[1].percentage).toBe(100);
  });
  it('maneja un registro vacío sin divisiones entre cero', () => {
    expect(summarizeUsers([]).distribution.map((item) => item.percentage)).toEqual([0, 0]);
  });
  it('exporta tildes, escapa separadores y comillas, y neutraliza fórmulas', () => {
    const csv = usersToCsv([
      new User('1', {
        username: '=1+1',
        firstName: 'Ana; María',
        lastName: 'Díaz "A"',
        sex: 'Femenino',
      }),
    ]);
    expect(csv).toContain('"\'=1+1"');
    expect(csv).toContain('"Ana; María"');
    expect(csv).toContain('"Díaz ""A"""');
    expect(csv.startsWith('\uFEFF')).toBe(true);
  });
});
