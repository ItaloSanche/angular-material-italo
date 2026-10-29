import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
@Injectable()
export class SpanishPaginator extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Usuarios por página';
  override nextPageLabel = 'Página siguiente';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primera página';
  override lastPageLabel = 'Última página';
  override getRangeLabel = (page: number, size: number, length: number): string => {
    if (!length || !size) return `0 de ${length}`;
    return `${page * size + 1} – ${Math.min((page + 1) * size, length)} de ${length}`;
  };
}
