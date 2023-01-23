import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-countryselect-type',
  template: `
    <div [formGroup]="form" id="dy-country-type">
        <mat-form-field class="dy-mat-field">
          <mat-label>{{field.label}}</mat-label>
            <mat-select [formControlName]="field.name" [compareWith]="compareFn"
              (ngModelChange)="change($event, field.name)" [disabled]="!field.readonly">
              <mat-option *ngFor="let obj of field.options" [value]="field.valueParam ? obj[field.valueParam] : obj">
                <img src="{{obj.flag}}" style="height: 20px; width: 30px;" alt="{{ obj.name }}" />&nbsp;&nbsp;
                {{obj.name}}
              </mat-option>
            </mat-select>
        </mat-form-field>
    </div>
  `,
  styles: ['.dy-mat-field {width: 100%}']
})

export class FormCountrySelectTypeComponent {

  @Input() field: any = {};
  @Input() form!: FormGroup;
  @Output() changeEvent = new EventEmitter();
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  get isTouched() { return this.form.controls[this.field.name].touched; }
  get isRequired() { return this.form.controls[this.field.name].errors?.['required']; }

  constructor() {
  }

  compareFn(val1: any, val2: any): boolean {
    return val1.code ? val1.code === val2.code : val1._id ? val1._id === val2._id : val1 ? val1 === val2.code : val1 === val2;
  }

  change(event: any, fieldname: string) {
    const obj = {
      'value': event,
      'name': fieldname
    };
    this.changeEvent.emit(obj);
  }

}
