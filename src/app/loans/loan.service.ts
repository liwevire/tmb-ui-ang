import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ILoan } from './loan';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private loansUrl = 'http://localhost:6080/api/loan/get';
  private loanByIdUrl = 'http://localhost:6080/api/loan/getById';

  constructor(private http: HttpClient) {}

  getLoans(): Observable<ILoan[]> {
    return this.http.get<ILoan[]>(this.loansUrl).pipe(
      tap((data) => console.log('All: ' + data))
      // catchError({err:this.handleError})
    );
  }

  getLoanById(id: number): Observable<ILoan> {
    return this.http
      .post<ILoan>(this.loanByIdUrl, { id: id })
      .pipe(
        tap((data) => console.log('LoanById: ' + data))
        // catchError({err:this.handleError})
      );
  }

  private handleError(err: HttpErrorResponse) {}
}
