import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-select-type',
  template: `
        <div [formGroup]="form" id="dy-select-type">
            <mat-form-field>
              <mat-label>{{field.label}}</mat-label>
                <mat-select [formControlName]="field.name" [multiple]="field.multiselect" [compareWith]="compareFn"
                 (ngModelChange)="change($event, field.name)" [disabled]="!field.readonly">
                  <mat-option *ngFor="let obj of field.options" [value]="field.valueParam ? obj[field.valueParam] : obj">
                    {{obj.name}}
                  </mat-option>
                </mat-select>
            </mat-form-field>
        </div>
      `
})

export class FormSelectTypeComponent {

  @Input() field: any = {};
  @Input() form!: FormGroup;
  @Output() changeEvent = new EventEmitter();
  @Input() index!: number;
  @Input() formArrayCtrl!: number;
  controlName = this.field.name;

  get isValid() {
    return this.form.controls[this.field.name].valid;
  }
  get isDirty() {
    return this.form.controls[this.field.name].dirty;
  }
  get isTouched() {
    return this.form.controls[this.field.name].touched;
  }
  get isRequired() {
    return this.form.controls[this.field.name].errors?.['required'];
  }

  constructor() {
  }

  change(event: any, fieldname: string) {
    const obj = {
      'value': event,
      'name': fieldname
    };
    this.changeEvent.emit(obj);
  }

  compareFn(val1: any, val2: any): boolean {
    return val1.code ? val1.code === val2.code : val1._id ? val1._id === val2._id : val1 ? val1 === val2.code : val1 === val2;
  }

}
