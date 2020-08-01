import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { LoanService } from '../../loans/loan.service';
import { ILoan } from '../../loans/loan';

@Component({
  selector: 'app-customer-loan-list',
  templateUrl: './customer-loan-list.component.html',
  styleUrls: ['./customer-loan-list.component.css'],
})
export class CustomerLoanListComponent implements OnInit {
  @Input() id: number;
  errorMessage: string;
  loans: ILoan[] = [];
  displayedColumns: string[] = ['id', 'status', 'weight'];
  dataSource: any;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loanService.getLoansByCustomerId(this.id).subscribe({
      next: (loans) => {
        this.loans = loans;
        this.dataSource = new MatTableDataSource<ILoan>(this.loans);
        this.dataSource.sort = this.sort;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
