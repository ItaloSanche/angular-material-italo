import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule],
  template: `
    <p class="eyebrow">ESPACIO DE TRABAJO</p>
    <h1>Dashboard</h1>
    <p class="page-description">Bienvenido al panel de administración.</p>
    <section class="welcome-panel">
      <img src="images/users.jfif" width="100" height="100" alt="" />
      <div>
        <h2>Todo empieza con tus usuarios</h2>
        <p class="muted">Consulta, agrega y actualiza los usuarios desde un solo lugar.</p>
        <a mat-flat-button routerLink="/dashboard/usuarios">Ir a usuarios</a>
      </div>
    </section>
  `,
})
export class HomeComponent {}
