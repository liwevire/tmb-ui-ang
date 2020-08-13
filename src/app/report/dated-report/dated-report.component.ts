import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';

import { IOutstandingReport } from '../report';
import { ReportService } from '../report.service';
import { CustomCalendarHeaderComponent } from '../../shared/custom-calendar-header/custom-calendar-header.component';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMM DD, yyyy',
    monthYearLabel: 'MMM YY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dated-report',
  templateUrl: './dated-report.component.html',
  styleUrls: ['./dated-report.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DatedReportComponent {
  calHeader = CustomCalendarHeaderComponent;
  report: IOutstandingReport;
  dateForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportService: ReportService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.prepareDateForm();
  }
  prepareDateForm() {
    this.dateForm = this.fb.group({
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
    });
  }
  onSubmit() {
    if (this.dateForm.value.startDate && this.dateForm.value.endDate) {
      this.reportService
        .getDatedReport(
          this.dateForm.value.startDate,
          this.dateForm.value.endDate
        )
        .subscribe({
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
}
