import { Component, Inject, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
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
        name: item.name,
        quantity: item.quantity,
      });
      this.itemsForm.push(itemGroup);
    });
  }
  addItem() {
    const newItemGroup = new FormGroup({
      name: new FormControl(''),
      quantity: new FormControl(''),
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
