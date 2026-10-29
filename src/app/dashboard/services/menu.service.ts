import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MenuItem } from '../model/menu-item';
@Injectable({ providedIn: 'root' })
export class MenuService {
  private readonly http = inject(HttpClient);
  getItems() {
    return this.http.get<readonly MenuItem[]>('data/menu.json');
  }
}
