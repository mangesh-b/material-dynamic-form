import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text, email, tel
@Component({
  selector: 'app-input-type',
  template: `
        <div [formGroup]="form" id="dy-input-type">
            <mat-form-field [appearance]="field.appearance">
              <mat-label>{{field.label}}</mat-label>
              <input [maxlength]="field.maxLength" matInput [type]="field.type"
                [formControlName]="field.name"
                [autocomplete]="'off'" [readonly]="field.readonly"
                (input)="change($any($event.target).value, field.name)"
                (blur)="blur($any($event.target).value, field.name)"
              />
              <mat-icon *ngIf="field.suffix" matSuffix>{{field.suffixIcon}}</mat-icon>
              <mat-icon *ngIf="field.matPrefix" matPrefix>{{field.suffixIcon}}</mat-icon>
              <mat-hint *ngIf="field.hint" [align]="field.alignPosition">{{field.hint}}</mat-hint>
            </mat-form-field>
        </div>
      `
})

export class FormInputTypeComponent {

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
