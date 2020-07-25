import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IItem } from '../../item';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  testItem: IItem = {
    name: 'testName222',
    id: 100,
    loanId: 0,
    quantity: '1000',
  };
  itemForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public items: IItem[],
    private fb: FormBuilder
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.itemForm = this.fb.group({
      name: this.testItem.name,
      quantity: '',
    });
  }
}
