import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthenticationService } from '../../application/authentication.service';
import { SignInRequest } from '../../domain/model/sign-in.request';
import { NotificationService } from '../../../shared/presentation/notification.service';
@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private readonly auth = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);
  readonly loading = signal(false);
  readonly form = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required, Validators.pattern(/\S/)]],
    password: ['', Validators.required],
  });
  async signIn(): Promise<void> {
    if (this.form.invalid || this.loading()) return;
    this.loading.set(true);
    const { username, password } = this.form.getRawValue();
    try {
      if (await this.auth.signIn(new SignInRequest(username, password)))
        await this.router.navigate(['/dashboard']);
      else {
        this.notifications.show('Usuario o contraseña incorrectos.');
        this.form.reset();
      }
    } catch {
      this.notifications.show('No se pudo iniciar sesión. Inténtalo nuevamente.');
    } finally {
      this.loading.set(false);
    }
  }
}
