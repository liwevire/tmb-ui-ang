import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { LoansComponent } from './loans/loans.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { LoanListComponent } from './loans/loan-list/loan-list.component';
import { AddLoanComponent } from './loans/add-loan/add-loan.component';
import { EditLoanComponent } from './loans/edit-loan/edit-loan.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';

const routes: Routes = [
  { path: 'customers', component: CustomerListComponent },
  { path: 'customer', component: EditCustomerComponent },
  { path: 'customer/:id', component: EditCustomerComponent },
  { path: 'loans', component: LoanListComponent },
  { path: 'loan', component: EditLoanComponent },
  { path: 'loan/:id', component: EditLoanComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  CustomersComponent,
  CustomerListComponent,
  AddCustomerComponent,
  EditCustomerComponent,
  LoansComponent,
  LoanListComponent,
  AddLoanComponent,
  EditLoanComponent,
];
