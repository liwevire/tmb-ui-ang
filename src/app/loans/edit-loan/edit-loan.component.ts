import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILoan } from '../loan';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-edit-loan',
  templateUrl: './edit-loan.component.html',
  styleUrls: ['./edit-loan.component.css'],
})
export class EditLoanComponent implements OnInit {
  errorMessage: string;
  id: number;
  loan: ILoan;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loanService: LoanService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loanService.getLoanById(this.id).subscribe({
      next: (loan) => {
        this.loan = loan;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
