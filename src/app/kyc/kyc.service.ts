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
    'http://192.168.43.146:6080/api/kyc/customerphoto/update';

  constructor(private http: HttpClient) {}

  updateCustomerPhoto(file: any): Observable<IAppStatus> {
    return this.http
      .post<IAppStatus>(this.updateCustomerPhotoUrl, file)
      .pipe(
        tap((data) => console.log('kycService.updateCustomerPhoto: ' + data))
      );
  }
}
