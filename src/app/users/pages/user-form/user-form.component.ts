import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../application/user.service';
import { Sex } from '../../domain/model/user';
import { NotificationService } from '../../../shared/presentation/notification.service';
@Component({
  selector: 'app-user-form',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly users = inject(UserService);
  private readonly notifications = inject(NotificationService);
  readonly id = this.route.snapshot.paramMap.get('id');
  readonly readOnly = this.route.snapshot.data['readOnly'] === true;
  readonly missing = signal(false);
  readonly saving = signal(false);
  readonly photoUrl = signal('');
  readonly photoLoading = signal(false);
  readonly title = this.readOnly
    ? 'Detalle del usuario'
    : this.id
      ? 'Editar usuario'
      : 'Nuevo usuario';
  readonly form = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required, Validators.pattern(/\S/)]],
    firstName: ['', [Validators.required, Validators.pattern(/\S/)]],
    lastName: ['', [Validators.required, Validators.pattern(/\S/)]],
    sex: ['' as Sex | '', Validators.required],
    healthStatus: ['', Validators.maxLength(2000)],
    allergies: ['', Validators.maxLength(2000)],
    medicalHistory: ['', Validators.maxLength(2000)],
    medicalNotes: ['', Validators.maxLength(2000)],
  });
  constructor() {
    if (this.id) {
      try {
        const user = this.users.get(this.id);
        this.form.patchValue(user);
        this.photoUrl.set(user.photoUrl);
      } catch {
        this.missing.set(true);
      }
    }
    if (this.readOnly || this.missing()) this.form.disable();
  }
  async save(): Promise<void> {
    if (
      this.form.invalid ||
      this.readOnly ||
      this.missing() ||
      this.saving() ||
      this.photoLoading()
    )
      return;
    const data = this.form.getRawValue();
    if (data.sex !== 'Masculino' && data.sex !== 'Femenino') return;
    this.saving.set(true);
    try {
      const userData = { ...data, sex: data.sex, photoUrl: this.photoUrl() };
      if (this.id) this.users.update(this.id, userData);
      else this.users.create(userData);
      this.notifications.show(
        this.id ? 'El usuario fue actualizado con éxito.' : 'El usuario fue agregado con éxito.',
      );
      await this.router.navigate(['/dashboard/usuarios']);
    } catch (error) {
      this.notifications.show(
        error instanceof Error ? error.message : 'No se pudo guardar el usuario.',
      );
    } finally {
      this.saving.set(false);
    }
  }
  async selectPhoto(event: Event): Promise<void> {
    if (this.readOnly || this.photoLoading()) return;
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    if (
      !['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ||
      file.size > 2 * 1024 * 1024
    ) {
      this.notifications.show('Selecciona una imagen JPG, PNG o WebP de hasta 2 MB.');
      return;
    }
    this.photoLoading.set(true);
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error('No se pudo leer la foto.'));
        reader.readAsDataURL(file);
      });
      const image = new Image();
      image.src = dataUrl;
      await image.decode();
      this.photoUrl.set(dataUrl);
    } catch {
      this.notifications.show('No se pudo abrir la imagen. Selecciona otra foto.');
    } finally {
      this.photoLoading.set(false);
    }
  }
}
