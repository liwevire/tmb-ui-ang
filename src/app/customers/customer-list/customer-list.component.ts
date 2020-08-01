import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomerService } from '../customer.service';
import { ICustomer } from '../customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  title = 'Customer list';
  customers: ICustomer[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'secondaryName',
    'post',
    'pin',
    'phone',
  ];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private customerService: CustomerService,
    private _snackBar: MatSnackBar
  ) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
        this.dataSource = new MatTableDataSource<ICustomer>(this.customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this._snackBar.open('ERROR!', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
