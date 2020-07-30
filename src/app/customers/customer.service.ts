import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ICustomer } from './customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerUrl = 'http://192.168.43.146:6080/api/customer/get';
  private customerByIdUrl = 'http://192.168.43.146:6080/api/customer/getById';
  private updateUrl = 'http://192.168.43.146:6080/api/customer/update';
  private deleteUrl = 'http://192.168.43.146:6080/api/customer/delete?id=';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.customerUrl).pipe(
      tap((data) => console.log('All: ' + data))
      // catchError({err:this.handleError})
    );
  }
  getCusomterById(id: number): Observable<ICustomer> {
    return this.http
      .post<ICustomer>(this.customerByIdUrl, { id: id })
      .pipe(
        tap((data) => {
          console.log('customerService.getCusomterById: ' + data);
          data.date = new Date(data.date);
        })
        // catchError({err:this.handleError})
      );
  }
  updateCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http
      .put<ICustomer>(this.updateUrl, customer)
      .pipe(
        tap((data) => console.log('customerService.updateCustomer: ' + data))
      );
  }
  deleteCustomer(id: number) {
    return this.http
      .delete<ICustomer>(this.deleteUrl + id)
      .pipe(
        tap((data) => console.log('customerService.deleteCustomer: ' + data))
      );
  }

  private handleError(err: HttpErrorResponse) {}
}
