import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'form-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent {

  @Input() field: any;
  @Input() form: any;
  @Input() isSubmitted: any;
  @Input() validationError: any;
  @Output() selectChangeEvent = new EventEmitter();
  @Output() multiSelectChangeEvent = new EventEmitter();
  @Output() inputChangeEvent = new EventEmitter();
  @Output() radioChangeEvent = new EventEmitter();
  @Output() checkboxChangeEvent = new EventEmitter();
  @Output() dateChangeEvent = new EventEmitter();
  @Output() blurInputChangeEvent = new EventEmitter();
  @Output() otpChangeEvent = new EventEmitter();
  @Output() blurOtpChangeEvent = new EventEmitter();

  get isValid() {
    if (this.form.controls[this.field.name]) {
      return this.form.controls[this.field.name].valid;
    }
    return;
  }
  get isDirty() {
    if (this.form.controls[this.field.name]) {
      return this.form.controls[this.field.name].dirty;
    }
    return;
  }
  get isTouched() {
    if (this.form.controls[this.field.name]) {
      return this.form.controls[this.field.name].touched;
    }
    return;
  }
  get isRequired() {
    if (this.form.controls[this.field.name]) {
      return this.form.controls[this.field.name].errors.required;
    }
    return;
  }
  get matDatepickerMin() {
    if (this.form.controls[this.field.name]) {
      return this.form.controls[this.field.name].errors.matDatepickerMin;
    }
    return;
  }
  get matDatepickerMax() {
    if (this.form.controls[this.field.name]) {
      return this.form.controls[this.field.name].errors.matDatepickerMax;
    }
    return;
  }
  get mustGreater() {
    if (this.form.controls[this.field.name]) {
      return this.form.controls[this.field.name].errors.mustGreater;
    }
    return;
  }
  get fieldNameError() {
    if (this.validationError[this.field.name]) {
      return this.validationError[this.field.name];
    }
    return;
  }
  get passwordNotMatched() {
    if (this.form.controls[this.field.name]) {
      return this.form.controls[this.field.name].errors.passwordNotMatched;
    }
    return;
  }
  get minLengthError() {
    if (this.form.controls[this.field.name]) {
      return this.form.controls[this.field.name].errors.minlength;
    }
    return;
  }
  get maxLengthError() {
    if (this.form.controls[this.field.name]) {
      return this.form.controls[this.field.name].errors.maxlength;
    }
    return;
  }

  constructor() { }

  ngOnInit() {
  }

}
