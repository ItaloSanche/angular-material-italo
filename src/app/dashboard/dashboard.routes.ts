import { Routes } from '@angular/router';
export const DASHBOARD_ROUTES: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'usuarios',
    loadChildren: () => import('../users/users.routes').then((m) => m.USERS_ROUTES),
  },
  {
    path: 'reportes',
    loadComponent: () =>
      import('../reports/pages/reports.component').then((m) => m.ReportsComponent),
  },
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
];
