import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-type',
  template: `
    <div [formGroup]="form" id="dy-number-type">
        <mat-form-field [appearance]="field.appearance" class="dy-mat-field">
          <mat-label>{{field.label}}</mat-label>
          <input [maxlength]="field.maxLength" matInput type="number" [min]="0"
            [formControlName]="field.name"
            [autocomplete]="'off'" [readonly]="field.readonly"
            (input)="change($any($event.target).value, field.name)"
            (blur)="blur($any($event.target).value, field.name)"
            numbersOnly />
        </mat-form-field>
    </div>
  `,
  styles: ['.dy-mat-field {width: 100%}']
})

export class FormNumberTypeComponent {

  @Input() field: any = {};
  @Input() form!: FormGroup;
  @Output() changeEvent = new EventEmitter();
  @Output() blurEvent = new EventEmitter();
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  get isTouched() { return this.form.controls[this.field.name].touched; }
  get isRequired() { return this.form.controls[this.field.name].errors?.['required']; }

  constructor() {
  }

  change(event: string | number, fieldname: string) {
    const obj = {
      'value': event,
      'name': fieldname
    };
    this.changeEvent.emit(obj);
  }

  blur(event: string | number, fieldname: string) {
    const obj = {
      'value': event,
      'name': fieldname
    };
    this.blurEvent.emit(obj);
  }

}
