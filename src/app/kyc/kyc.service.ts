import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAppStatus } from '../AppStatus';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class KycService {
  private updateCustomerPhotoUrl =
    'http://192.168.43.41:6080/api/kyc/customerphoto/update';
  private getCustomerPhotoUrl =
    'http://192.168.43.41:6080/api/kyc/customerphoto/getById?id=';

  constructor(private http: HttpClient) {}

  updateCustomerPhoto(file: any): Observable<IAppStatus> {
    return this.http
      .post<IAppStatus>(this.updateCustomerPhotoUrl, file)
      .pipe(
        tap((data) => console.log('kycService.updateCustomerPhoto: ' + data))
      );
  }
  getCustomerPhoto(id: number): Observable<IAppStatus> {
    return this.http.get<any>(this.getCustomerPhotoUrl + id);
  }
}
