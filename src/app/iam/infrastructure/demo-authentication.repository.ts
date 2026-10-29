import { Injectable } from '@angular/core';
import { SignInRequest } from '../domain/model/sign-in.request';
import { AuthenticationRepository } from '../domain/repositories/authentication.repository';

/** Autenticación educativa del tutorial; no representa seguridad de producción. */
@Injectable()
export class DemoAuthenticationRepository extends AuthenticationRepository {
  async signIn(request: SignInRequest): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return (
      ['jperez', 'italosanchez'].includes(request.username.trim()) &&
      request.password === 'admin123'
    );
  }
}
