import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatedReportComponent } from './dated-report.component';

describe('DatedReportComponent', () => {
  let component: DatedReportComponent;
  let fixture: ComponentFixture<DatedReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatedReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatedReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
