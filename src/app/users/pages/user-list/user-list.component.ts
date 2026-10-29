import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { SpanishPaginator } from '../../../shared/presentation/spanish-paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../domain/model/user';
import { UserService } from '../../application/user.service';
import { NotificationService } from '../../../shared/presentation/notification.service';
import { DeleteUserDialogComponent } from '../../components/delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-user-list',
  providers: [{ provide: MatPaginatorIntl, useClass: SpanishPaginator }],
  imports: [
    RouterLink,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements AfterViewInit {
  private readonly users = inject(UserService);
  private readonly notifications = inject(NotificationService);
  private readonly dialog = inject(MatDialog);
  readonly columns = ['username', 'firstName', 'lastName', 'sex', 'actions'];
  readonly dataSource = new MatTableDataSource<User>([...this.users.list()]);
  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  constructor() {
    this.dataSource.filterPredicate = (user, filter) =>
      this.normalize(`${user.username} ${user.firstName} ${user.lastName} ${user.sex}`).includes(
        filter,
      );
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  filter(value: string): void {
    this.dataSource.filter = this.normalize(value.trim());
    this.paginator.firstPage();
  }
  delete(user: User): void {
    this.dialog
      .open(DeleteUserDialogComponent, { data: user.username, width: '420px' })
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed !== true) return;
        try {
          this.users.delete(user.id);
          this.dataSource.data = [...this.users.list()];
          const lastPage = Math.max(
            0,
            Math.ceil(this.dataSource.filteredData.length / this.paginator.pageSize) - 1,
          );
          if (this.paginator.pageIndex > lastPage) this.paginator.firstPage();
          this.notifications.show('El usuario fue eliminado con éxito.');
        } catch (error) {
          this.notifications.show(
            error instanceof Error ? error.message : 'No se pudo eliminar el usuario.',
          );
        }
      });
  }
  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }
}
