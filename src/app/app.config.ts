import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthenticationRepository } from './iam/domain/repositories/authentication.repository';
import { DemoAuthenticationRepository } from './iam/infrastructure/demo-authentication.repository';
import { UserRepository } from './users/domain/repositories/user.repository';
import { InMemoryUserRepository } from './users/infrastructure/in-memory-user.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: AuthenticationRepository, useClass: DemoAuthenticationRepository },
    { provide: UserRepository, useClass: InMemoryUserRepository },
  ],
};
