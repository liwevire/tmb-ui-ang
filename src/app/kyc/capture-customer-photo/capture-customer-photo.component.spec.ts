import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureCustomerPhotoComponent } from './capture-customer-photo.component';

describe('CaptureCustomerPhotoComponent', () => {
  let component: CaptureCustomerPhotoComponent;
  let fixture: ComponentFixture<CaptureCustomerPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptureCustomerPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureCustomerPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
