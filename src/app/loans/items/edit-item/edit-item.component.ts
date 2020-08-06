import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IItem } from '../../item';
import { Globals } from '../../../util/globals';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  itemsForm = new FormArray([]);
  filteredItems: Observable<string[]>;
  constructor(
    public dialogRef: MatDialogRef<EditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public items: IItem[],
    private fb: FormBuilder,
    private globals: Globals
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
    this.dialogRef.close(this.itemsForm.value);
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  private _filter(value: IItem[]): string[] {
    let filterValue = '';
    if (value && value.length) filterValue = value[0].name.toLowerCase();
    return this.globals.itemSet.filter(
      (itemOption) => itemOption.toLowerCase().indexOf(filterValue) === 0
    );
  }
  ngOnInit() {
    this.filteredItems = this.itemsForm.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
}
