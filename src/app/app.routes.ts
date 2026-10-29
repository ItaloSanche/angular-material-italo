import { Routes } from '@angular/router';
import { authenticationGuard } from './iam/application/authentication.guard';
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./iam/pages/sign-in/sign-in.component').then((m) => m.SignInComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authenticationGuard],
    canActivateChild: [authenticationGuard],
    loadComponent: () =>
      import('./dashboard/components/shell/shell.component').then((m) => m.ShellComponent),
    loadChildren: () => import('./dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
