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
  filteredItems: Observable<string[]>[] = [];
  constructor(
    public dialogRef: MatDialogRef<EditItemComponent>,
    @Inject(MAT_DIALOG_DATA) public items: IItem[],
    private fb: FormBuilder,
    private globals: Globals
  ) {
    this.items.forEach((item, index) => {
      const itemGroup = this.fb.group({
        name: [item.name, Validators.required],
        quantity: [item.quantity, Validators.required],
      });
      this.itemsForm.push(itemGroup);
      this._manageItemControl(index);
    });
    this.items.forEach((item, index) => {});
  }
  addItem() {
    const newItemGroup = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', Validators.required],
    });
    this.itemsForm.push(newItemGroup);
    this._manageItemControl(this.itemsForm.length - 1);
  }
  removeItem(index: number) {
    this.itemsForm.removeAt(index);
    this.filteredItems.splice(index, 1);
  }
  onSubmit() {
    this.dialogRef.close(this.itemsForm.value);
  }
  onCancel(): void {
    this.dialogRef.close();
  }
  private _itemFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.globals.itemSet.filter(
      (itemOption) => itemOption.toLowerCase().indexOf(filterValue) === 0
    );
  }
  _manageItemControl(index: number) {
    this.filteredItems.push(
      this.itemsForm
        .at(index)
        .get('name')
        .valueChanges.pipe(
          startWith<string | IItem>(''),
          map((value) => (typeof value === 'string' ? value : value.name)),
          map((name) =>
            name ? this._itemFilter(name) : this.globals.itemSet.slice()
          )
        )
    );
  }
  ngOnInit() {}
}
