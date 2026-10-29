import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export const authenticationGuard: CanActivateFn = () =>
  inject(AuthenticationService).isAuthenticated() || inject(Router).createUrlTree(['/login']);
