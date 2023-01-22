import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-groupselect-type',
  template: `
        <div [formGroup]="form" id="dy-groupselect-type">
            <mat-form-field>
              <mat-label>{{field.label}}</mat-label>
                <mat-select [formControlName]="field.name"
                 (ngModelChange)="change($event, field.name)" [disabled]="!field.readonly">
                  <mat-optgroup *ngFor="let group of field.options" [label]="group.name"
                    [disabled]="group.disabled">
                  <mat-option *ngFor="let obj of group.childs" [value]="field.valueParam ? obj[field.valueParam] : obj">
                    {{obj.name}}
                  </mat-option>
                </mat-optgroup>
                </mat-select>
            </mat-form-field>
        </div>
      `
})

export class FormGroupSelectTypeComponent {

  @Input() field: any = {};
  @Input() form!: FormGroup;
  @Output() changeEvent = new EventEmitter();
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  get isTouched() { return this.form.controls[this.field.name].touched; }
  get isRequired() { return this.form.controls[this.field.name].errors?.['required']; }

  constructor() {
  }

  change(event: any, fieldname: string) {
    const obj = {
      'value': event,
      'name': fieldname
    };
    this.changeEvent.emit(obj);
  }

}
