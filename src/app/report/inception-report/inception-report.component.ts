import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportService } from '../report.service';
import { IReport } from '../report';

@Component({
  selector: 'app-inception-report',
  templateUrl: './inception-report.component.html',
  styleUrls: ['./inception-report.component.css'],
})
export class InceptionReportComponent implements OnInit {
  title = 'Inception report';
  report: IReport;
  constructor(
    private reportService: ReportService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.reportService.getReports().subscribe({
      next: (report) => {
        this.report = report;
      },
      error: (err) => {
        this._snackBar.open('ERROR!', 'Close', {
          duration: 5000,
        });
      },
    });
  }
}
