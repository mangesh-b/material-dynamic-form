import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment_ from 'moment';
const moment = moment_;

@Component({
  selector: 'app-date-type',
  template: `
        <div [formGroup]="form" id="dy-date-type">
            <mat-form-field>
              <input matInput [matDatepicker]="controlName"
                [max]="field.maxDate"
                [min]="field.minDate"
                [placeholder]="field.label" (focus)="controlName.open()"
                [formControlName]="field.name" [readonly]="true"
                [disabled]="!field.readonly"
                (dateChange)="change($any($event.target).value, field.name)">
              <mat-datepicker-toggle matSuffix [for]="controlName"></mat-datepicker-toggle>
              <mat-datepicker #controlName></mat-datepicker>
          </mat-form-field>
        </div>
      `
})

export class FormDateTypeComponent implements OnInit {

  @Input() field: any = {};
  @Input() form!: FormGroup;
  @Output() changeEvent = new EventEmitter();
  controlName = this.field.name;
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  get isTouched() { return this.form.controls[this.field.name].touched; }
  get isRequired() { return this.form.controls[this.field.name].errors?.['required']; }
  get matDatepickerMin() { return this.form.controls[this.field.name].errors?.['matDatepickerMin']; }
  get matDatepickerMax() { return this.form.controls[this.field.name].errors?.['matDatepickerMax']; }
  get mustGreater() { return this.form.controls[this.field.name].errors?.['mustGreater']; }

  constructor() {
  }

  ngOnInit() {
    if (this.field.name === 'dob') {
      // this.field.maxDate = moment().subtract(18, 'years');
    }
  }

  change(event: any, fieldname: string) {
    const obj = {
      'value': event,
      'name': fieldname
    };
    this.changeEvent.emit(obj);
  }

}
