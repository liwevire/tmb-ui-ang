import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

import { IActivity } from '../../activity';
import { CustomCalendarHeaderComponent } from '../../../shared/custom-calendar-header/custom-calendar-header.component';

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
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class EditActivityComponent implements OnInit {
  calHeader = CustomCalendarHeaderComponent;
  activitiesForm = new FormArray([]);
  constructor(
    public dialogRef: MatDialogRef<EditActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public activities: IActivity[],
    private fb: FormBuilder
  ) {
    this.activities.forEach((activity) => {
      activity.date = new Date(activity.date);
      const activityGroup = this.fb.group({
        date: [activity.date, Validators.required],
        category: [activity.category, Validators.required],
        amount: [activity.amount, Validators.required],
      });

      this.activitiesForm.push(activityGroup);
    });
  }
  addActivity() {
    const newActivityGroup = this.fb.group({
      date: ['', Validators.required],
      category: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.activitiesForm.push(newActivityGroup);
  }
  removeActivity(index: number) {
    this.activitiesForm.removeAt(index);
  }
  onSubmit() {
    this.dialogRef.close(this.activitiesForm.value);
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
