import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ILoan } from './loan';

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private loansUrl = 'http://192.168.43.146:6080/api/loan/get';
  private loanByIdUrl = 'http://192.168.43.146:6080/api/loan/getById';
  private updateUrl = 'http://192.168.43.146:6080/api/loan/update';
  private deleteUrl = 'http://192.168.43.146:6080/api/loan/delete?id=';

  constructor(private http: HttpClient) {}

  getLoans(): Observable<ILoan[]> {
    return this.http.get<ILoan[]>(this.loansUrl).pipe(
      tap((data) => console.log('loanService.getLoans: ' + data))
      // catchError({err:this.handleError})
    );
  }
  getLoanById(id: number): Observable<ILoan> {
    return this.http
      .post<ILoan>(this.loanByIdUrl, { id: id })
      .pipe(
        tap((data) => {
          console.log('loanService.getLoanById: ' + data);
          if (data.activities != null) {
            data.activities.sort(function (a, b): any {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
          }
        })
        // catchError({err:this.handleError})
      );
  }
  updateLoan(loan: ILoan): Observable<ILoan> {
    return this.http
      .put<ILoan>(this.updateUrl, loan)
      .pipe(tap((data) => console.log('loanService.updateLoan: ' + data)));
  }
  deleteLoan(id: number) {
    return this.http
      .delete<ILoan>(this.deleteUrl + id)
      .pipe(tap((data) => console.log('loanService.deleteLoan: ' + data)));
  }
  private handleError(err: HttpErrorResponse) {}
}
