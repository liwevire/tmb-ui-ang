import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IOutstandingReport, ILoanInterestReport } from './report';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apihost = environment.apihost;
  private inceptionReportUrl = this.apihost + '/api/report/inception';
  private datedReportUrl = this.apihost + '/api/report/dated';
  private getInterstByLoanUrl = this.apihost + '/api/report/getInterestById';
  constructor(private http: HttpClient) {}

  getInceptionReport(): Observable<IOutstandingReport> {
    return this.http.get<IOutstandingReport>(this.inceptionReportUrl).pipe(
      tap()
      // (data) => console.log('All: ' + data)
      // catchError({err:this.handleError})
    );
  }

  getDatedReport(startDate: Date, endDate:Date): Observable<IOutstandingReport> {
    return this.http.post<IOutstandingReport>(this.datedReportUrl, { startDate: startDate, endDate:endDate})
    .pipe(
      // tap()
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
