import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-type',
  template: `
    <div [formGroup]="form" id="radio-type">
        <mat-radio-group [formControlName]="field.name" [disabled]="!field.readonly">
            <mat-radio-button *ngFor="let obj of field.options" [value]="obj.value"
              style="min-width: 100px; margin-right: 10px;" (change)="change($event, field.name)">
              {{obj.label}}
            </mat-radio-button>
        </mat-radio-group>
    </div>
  `,
  styles: [`
    #radio-type {margin-top: 1rem; margin-bottom: 0.5rem;}
    ::ng-deep .mat-radio-button.mat-radio-disabled .mat-radio-label-content {color: #00aeef !important;}
  `]
})

export class FormRadioTypeComponent {

  @Input() field: any = {};
  @Input() form!: FormGroup;
  @Output() changeEvent = new EventEmitter();

  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  get isTouched() { return this.form.controls[this.field.name].touched; }
  get isRequired() { return this.form.controls[this.field.name].errors?.['required']; }

  constructor() {
  }

  change(event: any, key: any) {
    const obj = {
      'value': event.value,
      'name': key
    };
    this.changeEvent.emit(obj);
  }

}
