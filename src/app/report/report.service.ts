import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IInceptionReport, ILoanInterestReport } from './report';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apihost = environment.apihost;
  private inceptionReportUrl = this.apihost + '/api/report/get';
  private getInterstByLoanUrl = this.apihost + '/api/report/getInterestById';
  constructor(private http: HttpClient) {}

  getReports(): Observable<IInceptionReport> {
    return this.http.get<IInceptionReport>(this.inceptionReportUrl).pipe(
      tap()
      // (data) => console.log('All: ' + data)
      // catchError({err:this.handleError})
    );
  }

  getInterstByLoan(id: number): Observable<ILoanInterestReport> {
    return this.http
      .post<ILoanInterestReport>(this.getInterstByLoanUrl, { id: id })
      .pipe
      // tap((data) => {
      //   console.log('loanService.getLoanById: ' + data);
      // })
      // catchError({err:this.handleError})
      ();
  }
}
