import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserReportService, usersToCsv } from '../application/user-report.service';

@Component({
  selector: 'app-reports',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  readonly report = inject(UserReportService).generate();
  download(): void {
    const url = URL.createObjectURL(
      new Blob([usersToCsv(this.report.users)], { type: 'text/csv;charset=utf-8;' }),
    );
    const link = document.createElement('a');
    link.href = url;
    link.download = 'app-users-reporte.csv';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
