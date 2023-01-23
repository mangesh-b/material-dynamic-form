import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text, email, tel, password,
@Component({
  selector: 'app-password-type',
  template: `
    <div [formGroup]="form" id="dy-password-type">
      <mat-form-field [appearance]="field.appearance" class="dy-mat-field">
        <mat-label>{{field.label}}</mat-label>
        <input matInput type="password" [readonly]="field.readonly"
          [formControlName]="field.name" [min]="0" [type]="hidePass ? 'password' : 'text'"
          autocomplete="'off'">
        <mat-icon matSuffix (click)="hidePass = !hidePass">
          <i class="material-icons ft-sz-initial"> {{hidePass ? 'visibility_off' : 'visibility'}} </i>
        </mat-icon>
      </mat-form-field>
    </div>
  `,
  styles: ['.dy-mat-field {width: 100%}']
})

export class FormPasswordTypeComponent {

  @Input() field: any = {};
  @Input() form!: FormGroup;
  hidePass: boolean;
  get isValid() { return this.form.controls[this.field.name].valid; }
  get isDirty() { return this.form.controls[this.field.name].dirty; }
  get isTouched() { return this.form.controls[this.field.name].touched; }
  get isRequired() { return this.form.controls[this.field.name].errors?.['required']; }
  get passwordNotMatched() { return this.form.controls[this.field.name].errors?.['passwordNotMatched']; }

  constructor() {
    this.hidePass = true;
  }

}
