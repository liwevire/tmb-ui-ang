import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

import { CustomCalendarHeaderComponent } from '../../shared/custom-calendar-header/custom-calendar-header.component';
import { CustomerService } from '../customer.service';
import { ICustomer } from '../customer';

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
  calHeader = CustomCalendarHeaderComponent;
  errorMessage: string;
  id: number;
  customer: ICustomer;
  customerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    this.customer = { ...this.customer, ...this.customerForm.value };
    this.customerService.updateCustomer(this.customer).subscribe({
      next: (customer) => {
        this.customer = customer;
        this.prepareCustomerForm(this.customer);
        this.router.navigate(['/customer/' + this.customer.id]);
      },
    });
  }
  onDelete() {
    this.customerService.deleteCustomer(this.customer.id).subscribe({
      next: (customer) => {
        this.router.navigate(['/customers']);
      },
    });
  }
  prepareCustomerForm(customer: ICustomer) {
    customer.date = new Date(customer.date);
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
        },
        error: (err) => (this.errorMessage = err),
      });
    } else {
      this.customer = { ...emptyCustomer };
      this.prepareCustomerForm(this.customer);
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
