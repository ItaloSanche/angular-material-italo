import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { UserRepository } from '../domain/repositories/user.repository';
import { InMemoryUserRepository } from '../infrastructure/in-memory-user.repository';

describe('Gestión de usuarios', () => {
  it('conserva foto y ficha de salud al editar sin modificar otro usuario', () => {
    const users = TestBed.inject(UserService);
    const target = users.list()[0];
    const photoUrl = 'data:image/png;base64,aGVsbG8=';
    users.update(target.id, {
      ...target,
      photoUrl,
      healthStatus: ' En seguimiento ',
      allergies: 'Dato de prueba',
      medicalHistory: 'Antecedente de prueba',
      medicalNotes: 'Observación de prueba',
    });
    expect(users.get(target.id).photoUrl).toBe(photoUrl);
    expect(users.get(target.id).healthStatus).toBe('En seguimiento');
    expect(users.get(target.id).medicalHistory).toBe('Antecedente de prueba');
    expect(users.list()[1].medicalHistory).toBe('');
    users.update(target.id, { ...users.get(target.id), photoUrl: '' });
    expect(users.get(target.id).photoUrl).toBe('');
    expect(users.get(target.id).allergies).toBe('Dato de prueba');
  });
  let service: UserService;
  const data = { username: 'nuevo', firstName: 'Ana', lastName: 'Díaz', sex: 'Femenino' as const };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserRepository, useClass: InMemoryUserRepository }],
    });
    service = TestBed.inject(UserService);
  });
  it('crea un usuario al inicio y recorta espacios', () => {
    service.create({ ...data, username: ' nuevo ' });
    expect(service.list()).toHaveLength(7);
    expect(service.list()[0].username).toBe('nuevo');
    expect(service.list()[0].id).toBeTruthy();
  });
  it('rechaza usuarios duplicados sin distinguir mayúsculas y espacios', () => {
    expect(() => service.create({ ...data, username: ' J.PEREZ ' })).toThrow('ya está registrado');
    expect(service.list()).toHaveLength(6);
  });
  it('actualiza por identificador conservando los demás registros', () => {
    const target = service.list()[4];
    service.update(target.id, { ...target, lastName: 'Actualizado' });
    expect(service.get(target.id).lastName).toBe('Actualizado');
    expect(service.list()[0].lastName).toBe('Pérez');
    expect(service.list()).toHaveLength(6);
  });
  it('elimina el registro seleccionado por ID independientemente del orden visual', () => {
    const target = [...service.list()].reverse()[0];
    service.delete(target.id);
    expect(service.list()).toHaveLength(5);
    expect(() => service.get(target.id)).toThrow('no existe');
  });
  it('rechaza campos vacíos sin modificar la lista', () => {
    expect(() => service.create({ ...data, firstName: '   ' })).toThrow('Completa');
    expect(service.list()).toHaveLength(6);
  });
  it('no actualiza un identificador inexistente', () => {
    expect(() => service.update('missing', data)).toThrow('no existe');
  });
});
