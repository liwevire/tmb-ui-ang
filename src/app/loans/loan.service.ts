import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { ILoan } from './loan';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private apihost = environment.apihost;
  private loansUrl = this.apihost + '/api/loan/get';
  private loansByCustomerUrl = this.apihost + '/api/loan/getByCustomerId';
  private loanByIdUrl = this.apihost + '/api/loan/getById';
  private updateUrl = this.apihost + '/api/loan/update';
  private deleteUrl = this.apihost + '/api/loan/delete?id=';

  constructor(private http: HttpClient) {}

  getLoans(): Observable<ILoan[]> {
    return this.http
      .get<ILoan[]>(this.loansUrl)
      .pipe
      // tap((data) => console.log('loanService.getLoans: ' + data))
      // catchError({err:this.handleError})
      ();
  }

  getLoansByCustomerId(id: number): Observable<ILoan[]> {
    return this.http
      .post<ILoan[]>(this.loansByCustomerUrl, { id: id })
      .pipe
      // tap((data) => console.log('loanService.getLoansByCustomerId: ' + data))
      // catchError({err:this.handleError})
      ();
  }

  getLoanById(id: number): Observable<ILoan> {
    return this.http
      .post<ILoan>(this.loanByIdUrl, { id: id })
      .pipe
      // tap((data) => {
      //   console.log('loanService.getLoanById: ' + data);
      // })
      // catchError({err:this.handleError})
      ();
  }
  updateLoan(loan: ILoan): Observable<ILoan> {
    return this.http
      .put<ILoan>(this.updateUrl, loan)
      .pipe
      // tap((data) => console.log('loanService.updateLoan: ' + data))
      ();
  }
  deleteLoan(id: number) {
    return this.http
      .delete<ILoan>(this.deleteUrl + id)
      .pipe
      // tap((data) => console.log('loanService.deleteLoan: ' + data))
      ();
  }
  private handleError(err: HttpErrorResponse) {}
}
