import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCalendarHeaderComponent } from './custom-calendar-header.component';

describe('CustomCalendarHeaderComponent', () => {
  let component: CustomCalendarHeaderComponent;
  let fixture: ComponentFixture<CustomCalendarHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCalendarHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCalendarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
