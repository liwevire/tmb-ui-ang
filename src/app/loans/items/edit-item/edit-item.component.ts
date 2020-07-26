import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IItem } from '../../item';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  itemsForm = new FormArray([]);
  constructor(
    public dialogRef: MatDialogRef<EditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public items: IItem[],
    private fb: FormBuilder
  ) {
    this.items.forEach((item) => {
      const itemGroup = this.fb.group({
        name: [item.name, Validators.required],
        quantity: [item.quantity, Validators.required],
      });
      this.itemsForm.push(itemGroup);
    });
  }
  addItem() {
    const newItemGroup = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
    });
    this.itemsForm.push(newItemGroup);
  }
  removeItem(index: number) {
    this.itemsForm.removeAt(index);
  }
  onSubmit() {
    console.log(this.itemsForm.value);
    this.dialogRef.close(this.itemsForm.value);
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}
}
