import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
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

import { LoanService } from '../loan.service';
import { EditItemComponent } from '../items/edit-item/edit-item.component';
import { EditActivityComponent } from '../activities/edit-activity/edit-activity.component';
import { ILoan } from '../loan';
import { IItem } from '../item';
import { IActivity, activitySortByDate } from '../activity';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-loan',
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditLoanComponent implements OnInit {
  title: string;
  errorMessage: string;
  id: number;
  loan: ILoan;
  itemDataSource: any;
  activityDataSource: any;
  itemColumns: string[] = ['name', 'quantity'];
  activityColumns: string[] = ['date', 'category', 'amount'];
  loanForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  openItemDialog(): void {
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '450px',
      height: '90%',
      data: this.loan.items,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loan.items = result;
      this.refreshDataSource();
    });
  }
  openActivityDialog(): void {
    const dialogRef = this.dialog.open(EditActivityComponent, {
      width: '700px',
      height: '90%',
      data: this.loan.activities,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loan.activities = result;
      this.refreshDataSource();
    });
  }
  onSubmit() {
    this.loan = { ...this.loan, ...this.loanForm.value };
    this.loanService.updateLoan(this.loan).subscribe({
      next: (loan) => {
        this.loan = loan;
        this.prepareLoanForm(this.loan);
        this.refreshDataSource();
        this.router.navigate(['/loan/' + this.loan.id]);
      },
    });
  }
  onDelete() {
    this.loanService.deleteLoan(this.loan.id).subscribe({
      next: (loan) => {
        this.router.navigate(['/loans']);
      },
    });
  }
  prepareLoanForm(loan: ILoan) {
    this.loanForm = this.fb.group({
      status: [loan.status, Validators.required],
      weight: [loan.weight, Validators.required],
      comment: [loan.comment],
      customer: this.fb.group({
        id: [loan.customer.id, Validators.required],
      }),
    });
  }
  refreshDataSource(): void {
    this.itemDataSource = new MatTableDataSource<IItem>(this.loan.items);
    this.activityDataSource = new MatTableDataSource<IActivity>(
      this.loan.activities
    );
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.loanService.getLoanById(this.id).subscribe({
        next: (loan) => {
          this.loan = loan;
          this.prepareLoanForm(this.loan);
          this.refreshDataSource();
          activitySortByDate(this.loan.activities);
          this.title = 'Edit Loan | LoanID: ' + this.loan.id;
        },
        error: (err) => (this.errorMessage = err),
      });
    } else {
      this.loan = { ...emptyLoan };
      this.prepareLoanForm(this.loan);
      this.refreshDataSource();
      this.title = 'New Loan';
    }
  }
}

const emptyLoan = {
  id: 0,
  status: 'open',
  weight: '0',
  comment: '',
  activities: [
    {
      amount: '0',
      category: 'principal',
      date: new Date(),
    },
    {
      amount: '15',
      category: 'appraiserFee',
      date: new Date(),
    },
  ],
  items: [
    {
      name: '',
      quantity: 0,
    },
  ],
  statusCode: 0,
  statusMessage: '',
  customer: {
    id: 0,
    name: '',
    secondaryName: '',
    address: '',
    post: '',
    pin: '',
    phone: '',
    date: new Date(),
    statusCode: 0,
    statusMessage: '',
  },
};
