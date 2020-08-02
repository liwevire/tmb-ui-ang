import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { WebcamImage } from 'ngx-webcam';

import { CustomCalendarHeaderComponent } from '../../shared/custom-calendar-header/custom-calendar-header.component';
import { CustomerService } from '../customer.service';
import { KycService } from '../../kyc/kyc.service';
import { ICustomer } from '../customer';
import { checkApiResponse } from '../../util/apiUtil';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { IAppStatus } from 'src/app/AppStatus';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMM DD, yyyy',
    monthYearLabel: 'MMM YY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditCustomerComponent implements OnInit {
  // latest snapshot
  webcamImage: WebcamImage = null;
  title: string;
  titleLoanList: string;
  calHeader = CustomCalendarHeaderComponent;
  id: number;
  customer: ICustomer;
  customerForm: FormGroup;
  percentDone: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private kycService: KycService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }
  clearImage() {
    this.webcamImage = null;
  }
  onSubmit() {
    this.customer = { ...this.customer, ...this.customerForm.value };
    this.customerService.updateCustomer(this.customer).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.prepareCustomerForm(this.customer);
        if (checkApiResponse(this.customer))
          this._snackBar.open(checkApiResponse(this.customer), 'Close', {
            duration: 5000,
          });
        this.router.navigate(['/customer/' + this.customer.id]);
      },
      error: (err) => {
        this._snackBar.open('ERROR!', 'Close', {
          duration: 5000,
        });
      },
    });
  }
  onDelete() {
    this.customerService.deleteCustomer(this.customer.id).subscribe({
      next: (customer) => {
        if (checkApiResponse(customer))
          this._snackBar.open(checkApiResponse(customer), 'Close', {
            duration: 5000,
          });
        this.router.navigate(['/customers']);
      },
      error: (err) => {
        this._snackBar.open('ERROR!', 'Close', {
          duration: 5000,
        });
      },
    });
  }
  onSavePhoto() {
    this.kycService
      .updateCustomerPhoto({
        id: this.customer.id,
        data: this.webcamImage.imageAsBase64,
      })
      .subscribe({
        next: (apiStatus) => {
          if (checkApiResponse(apiStatus))
            this._snackBar.open(checkApiResponse(apiStatus), 'Close', {
              duration: 5000,
            });
          this.router.navigate(['/customer/' + this.customer.id]);
        },
        error: (err) => {
          this._snackBar.open('ERROR!', 'Close', {
            duration: 5000,
          });
        },
      });
  }
  prepareCustomerForm(customer: ICustomer) {
    this.customerForm = this.fb.group({
      name: [customer.name, Validators.required],
      secondaryName: [customer.secondaryName, Validators.required],
      date: [customer.date, Validators.required],
      address: [customer.address, Validators.required],
      post: [customer.post, Validators.required],
      pin: [customer.pin],
      phone: [customer.phone],
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.customerService.getCusomterById(this.id).subscribe({
        next: (customer) => {
          this.customer = customer;
          this.prepareCustomerForm(this.customer);
          this.title = 'Edit Customer | CustomerID: ' + this.customer.id;
          this.titleLoanList = 'titleLoanList';
        },
        error: (err) => {
          this._snackBar.open('ERROR!', 'Close', {
            duration: 5000,
          });
        },
      });
    } else {
      this.customer = { ...emptyCustomer };
      this.prepareCustomerForm(this.customer);
      this.title = 'New Customer';
    }
  }
}

const emptyCustomer = {
  id: 0,
  name: '',
  secondaryName: '',
  date: new Date(),
  address: '',
  post: '',
  pin: '',
  phone: '',
  statusCode: 0,
  statusMessage: '',
};
