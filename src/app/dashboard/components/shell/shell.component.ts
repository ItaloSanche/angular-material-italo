import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { catchError, of } from 'rxjs';
import { MenuService } from '../../services/menu.service';
import { AuthenticationService } from '../../../iam/application/authentication.service';
import { NotificationService } from '../../../shared/presentation/notification.service';
@Component({
  selector: 'app-shell',
  imports: [AsyncPipe, RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  private readonly auth = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);
  readonly menu$ = inject(MenuService)
    .getItems()
    .pipe(
      catchError(() => {
        this.notifications.show('No se pudo cargar el menú. Recarga la página.');
        return of([]);
      }),
    );
  signOut(): void {
    this.auth.signOut();
    void this.router.navigate(['/login']);
  }
}
