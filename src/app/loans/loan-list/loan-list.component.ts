import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoanService } from '../loan.service';
import { ILoan, getPrincipalActivity } from '../loan';
import { IActivity } from '../activity';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css'],
})
export class LoanListComponent implements OnInit {
  title = 'Loan list';
  errorMessage: string;
  loans: ILoan[] = [];
  displayedColumns: string[] = [
    'id',
    'altId',
    'date',
    'name',
    'post',
    'principal',
    'status',
    'weight',
    'comment',
  ];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private loanService: LoanService,
    private _snackBar: MatSnackBar
  ) {}

  getPrincipalActivity(activities: IActivity[]): IActivity {
    return getPrincipalActivity(activities) as IActivity;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.loanService.getLoans().subscribe({
      next: (loans) => {
        this.loans = loans;
        this.dataSource = new MatTableDataSource<ILoan>(this.loans);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this._snackBar.open('ERROR!', 'Close', {
          duration: 5000,
        });
      },
    });
  }
}
