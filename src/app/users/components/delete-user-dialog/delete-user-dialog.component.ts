import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-delete-user-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Eliminar usuario</h2>
    <mat-dialog-content
      >¿Deseas eliminar a <strong>{{ username }}</strong
      >?</mat-dialog-content
    >
    <mat-dialog-actions align="end"
      ><button mat-button [mat-dialog-close]="false" cdkFocusInitial>Cancelar</button
      ><button mat-flat-button [mat-dialog-close]="true">Eliminar</button></mat-dialog-actions
    >
  `,
})
export class DeleteUserDialogComponent {
  readonly username = inject<string>(MAT_DIALOG_DATA);
}
