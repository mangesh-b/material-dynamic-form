import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-type',
  template: `
        <div id="dy-checkbox-type" [formGroup]="form">
          <mat-checkbox [formControlName]="field.name"
            (ngModelChange)="change($event, field.name)">
            {{field.label}}
          </mat-checkbox>
        </div>
      `,
  styles: ['#checkbox-type {margin-top: 1rem; margin-bottom: 0.5rem;}']
})

export class FormCheckboxTypeComponent {

  @Input() field: any = {};
  @Input() form!: FormGroup;
  @Output() changeEvent = new EventEmitter();
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  get isTouched() { return this.form.controls[this.field.name].touched; }
  get isRequired() { return this.form.controls[this.field.name].errors?.['required']; }

  constructor() {
  }

  change(clickedEvent: string | number, fieldname: string) {
    const obj = {
      'value': clickedEvent,
      'name': fieldname
    };
    this.changeEvent.emit(obj);
  }

}
