import { inject, Injectable, signal } from '@angular/core';
import { SignInRequest } from '../domain/model/sign-in.request';
import { AuthenticationRepository } from '../domain/repositories/authentication.repository';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly repository = inject(AuthenticationRepository);
  private readonly authenticated = signal(false);
  readonly isAuthenticated = this.authenticated.asReadonly();
  async signIn(request: SignInRequest): Promise<boolean> {
    const accepted = await this.repository.signIn(request);
    this.authenticated.set(accepted);
    return accepted;
  }
  signOut(): void {
    this.authenticated.set(false);
  }
}
