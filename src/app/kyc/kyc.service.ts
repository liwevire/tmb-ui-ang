import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAppStatus } from '../AppStatus';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class KycService {
  private apihost = environment.apihost;
  private updateCustomerPhotoUrl =
    this.apihost + '/api/kyc/customerphoto/update';
  private getCustomerPhotoUrl =
    this.apihost + '/api/kyc/customerphoto/getById?id=';

  constructor(private http: HttpClient) {}

  updateCustomerPhoto(file: any): Observable<IAppStatus> {
    return this.http
      .post<IAppStatus>(this.updateCustomerPhotoUrl, file)
      .pipe
      // tap((data) => console.log('kycService.updateCustomerPhoto: ' + data))
      ();
  }
  getCustomerPhoto(id: number): Observable<IAppStatus> {
    return this.http.get<any>(this.getCustomerPhotoUrl + id);
  }
}
