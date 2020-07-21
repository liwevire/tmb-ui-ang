import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ICustomer } from './customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerUrl = 'http://localhost:6080/api/customer/get';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.customerUrl).pipe(
      tap((data) => console.log('All: ' + data))
      // catchError({err:this.handleError})
    );
  }

  private handleError(err: HttpErrorResponse) {}
}
