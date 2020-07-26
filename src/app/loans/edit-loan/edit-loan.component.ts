import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ILoan } from '../loan';
import { LoanService } from '../loan.service';
import { EditItemComponent } from '../items/edit-item/edit-item.component';
import { IItem } from '../item';

@Component({
  selector: 'app-edit-loan',
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.css'],
})
export class EditLoanComponent implements OnInit {
  errorMessage: string;
  id: number;
  loan: ILoan;
  itemDataSource: any;
  displayedColumns: string[] = ['name', 'quantity'];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '540px',
      height: '90%',
      data: this.loan.items,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loan.items = result;
      this.refreshDataSource();
      console.log('The dialog was closed');
    });
  }

  refreshDataSource(): void {
    this.itemDataSource = new MatTableDataSource<IItem>(this.loan.items);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loanService.getLoanById(this.id).subscribe({
      next: (loan) => {
        this.loan = loan;
        this.refreshDataSource();
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
