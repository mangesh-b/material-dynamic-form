import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text, email, tel, password,
@Component({
  selector: 'app-textarea-type',
  template: `
    <div [formGroup]="form" id="dy-textarea-type">
        <mat-form-field class="dy-mat-field">
          <mat-label>{{field.label}}</mat-label>
          <textarea [maxlength]="field.maxLength" matInput
            [formControlName]="field.name"
            [readonly]="field.readonly"
            (blur)="blur($any($event.target).value, field.name)"
          >
          </textarea>
        </mat-form-field>
    </div>
  `,
  styles: ['.dy-mat-field {width: 100%}']
})

export class FormTextareaTypeComponent {

  @Input() field: any = {};
  @Input() form!: FormGroup;
  @Output() blurEvent = new EventEmitter();
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  get isTouched() { return this.form.controls[this.field.name].touched; }
  get isRequired() { return this.form.controls[this.field.name].errors?.['required']; }

  constructor() {
  }

  blur(event: string | number, fieldname: string) {
    const obj = {
      'value': event,
      'name': fieldname
    };
    this.blurEvent.emit(obj);
  }

}
