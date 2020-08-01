import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoanListComponent } from './customer-loan-list.component';

describe('CustomerLoanListComponent', () => {
  let component: CustomerLoanListComponent;
  let fixture: ComponentFixture<CustomerLoanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLoanListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
