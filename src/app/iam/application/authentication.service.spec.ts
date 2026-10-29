import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { AuthenticationRepository } from '../domain/repositories/authentication.repository';
import { DemoAuthenticationRepository } from '../infrastructure/demo-authentication.repository';
import { SignInRequest } from '../domain/model/sign-in.request';
import { authenticationGuard } from './authentication.guard';
import { provideRouter, Router, UrlTree } from '@angular/router';

describe('Acceso de demostración', () => {
  it('permite ingresar con italosanchez y admin123', async () => {
    const service = TestBed.inject(AuthenticationService);
    expect(await service.signIn(new SignInRequest('italosanchez', 'admin123'))).toBe(true);
    expect(service.isAuthenticated()).toBe(true);
    expect(await service.signIn(new SignInRequest('italosanchez', 'incorrecta'))).toBe(false);
  });
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthenticationRepository, useClass: DemoAuthenticationRepository },
      ],
    }),
  );
  it('redirige al login sin sesión', () => {
    const result = TestBed.runInInjectionContext(() =>
      authenticationGuard({} as never, {} as never),
    );
    expect(result instanceof UrlTree).toBe(true);
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/login');
  });
  it('acepta credenciales demo y permite cerrar sesión', async () => {
    const service = TestBed.inject(AuthenticationService);
    expect(await service.signIn(new SignInRequest('jperez', 'admin123'))).toBe(true);
    expect(service.isAuthenticated()).toBe(true);
    expect(TestBed.runInInjectionContext(() => authenticationGuard({} as never, {} as never))).toBe(
      true,
    );
    service.signOut();
    expect(service.isAuthenticated()).toBe(false);
  });
  it('rechaza credenciales incorrectas', async () => {
    const service = TestBed.inject(AuthenticationService);
    expect(await service.signIn(new SignInRequest('jperez', 'incorrecta'))).toBe(false);
    expect(service.isAuthenticated()).toBe(false);
  });
});
