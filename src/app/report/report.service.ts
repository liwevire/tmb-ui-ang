import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IReport } from './report';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apihost = environment.apihost;
  private reportUrl = this.apihost + '/api/report/get';
  constructor(private http: HttpClient) {}

  getReports(): Observable<IReport> {
    return this.http.get<IReport>(this.reportUrl).pipe(
      tap()
      // (data) => console.log('All: ' + data)
      // catchError({err:this.handleError})
    );
  }
}
