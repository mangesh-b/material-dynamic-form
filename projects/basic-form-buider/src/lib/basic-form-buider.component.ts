import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import * as moment_ from 'moment';
const moment = moment_;

export function CompareTwoDates(startDate: string, endDate: string) {
  return (formGroup: FormGroup) => {
    const sDate = formGroup.controls[startDate];
    const eDaste = formGroup.controls[endDate];
    if (eDaste.errors && !eDaste.errors?.['mustMatch']) {
      return;
    }
    const value = moment(eDaste.value).diff(moment(sDate.value), 'days');
    if (value < 0) {
      eDaste.setErrors({ mustGreater: true });
    } else {
      eDaste.setErrors(null);
    }
  };
}
export function CompareConfirmPassword(password: string, confrimPassword: string) {
  return (formGroup: FormGroup) => {
    const pass = formGroup.controls[password];
    const cPass = formGroup.controls[confrimPassword];
    if (cPass.errors && !cPass.errors?.['mustMatch']) {
      return;
    }
    if (pass.value !== cPass.value) {
      cPass.setErrors({ passwordNotMatched: true });
    } else {
      cPass.setErrors(null);
    }
  };
}

@Component({
  selector: 'dy-basic-form-buider',
  templateUrl: './basic-form-buider.component.html',
  styleUrls: ['./basic-form-buider.component.css']
})
export class BasicFormBuiderComponent {
  form!: FormGroup;
  @Input() submitted: boolean = false;
  @Input() fields: any[] = [];
  @Input() buttons: any = {};
  @Input() inputId: any;
  @Input() validationError: any;
  @Input() fieldsMandatoryCheck: boolean;
  @Input() isSubmitted: any;
  @Output() selectChangeEvent = new EventEmitter();
  @Output() multiSelectChangeEvent = new EventEmitter();
  @Output() radioChangeEvent = new EventEmitter();
  @Output() inputChangeEvent = new EventEmitter();
  @Output() checkboxChangeEvent = new EventEmitter();
  @Output() dateChangeEvent = new EventEmitter();
  @Output() blurInputChangeEvent = new EventEmitter();
  @Output() otpChangeEvent = new EventEmitter();
  @Output() blurOtpChangeEvent = new EventEmitter();
  @Output() submitBtnEvent = new EventEmitter();
  @Output() secondaryBtnEvent = new EventEmitter();
  @Output() tertiaryBtnEvent = new EventEmitter();
  @Output() errorsOnSubmitEvent = new EventEmitter();
  @ViewChild('formRef', { static: false }) formRef!: NgForm;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.fieldsMandatoryCheck = true;
  }

  ngOnInit() {
    const fieldsCtrls: any = {};
    for (const obj of this.fields) {
      // skip field title of the form
      if (obj.type !== 'header') {
        let req: any = [];
        // add validations to the field
        if (obj.validation && Object.keys(obj.validation).length) {
          if (obj.validation.required === true) req.push(Validators.required);
          if (obj.validation.min) req.push( Validators.minLength(obj.validation.min));
          if (obj.validation.max) req.push( Validators.maxLength(obj.validation.max));
          if (obj.validation.pattern === true) req.push(Validators.pattern(obj.validation.pattern));
        }
        fieldsCtrls[obj.name] = new FormControl(obj.default || '', req);
      }
    }
    this.form = this.formBuilder.group(fieldsCtrls);

    // in-case you have to set other validation based on fields key
    const startKeyExist = 'startDate' in fieldsCtrls;
    const endKeyExist = 'endDate' in fieldsCtrls;
    if (startKeyExist && endKeyExist) {
      this.form = this.formBuilder.group(fieldsCtrls, { validator: CompareTwoDates('startDate', 'endDate') });
    } else {
      this.form = this.formBuilder.group(fieldsCtrls);
    }

    // password - confirm passowrd matcher
    const passwordKeyExist = 'password' in fieldsCtrls;
    const confirmPasswordKeyExist = 'confirmPassword' in fieldsCtrls;
    if (passwordKeyExist && confirmPasswordKeyExist) {
      this.form = this.formBuilder.group(fieldsCtrls, { validator: CompareConfirmPassword('password', 'confirmPassword') });
    } else {
      this.form = this.formBuilder.group(fieldsCtrls);
    }
  }

  onSubmit(formdata: any) {
    this.isSubmitted = true;
    this.getFormValidationErrors();
    console.log(formdata);

    if (formdata.invalid && this.fieldsMandatoryCheck) {
      return false;
    }
    this.submitBtnEvent.emit(formdata.value);
    return true;
  }

  // event trigger from parent, and submit form event
  parentSubmitEvent() {
    this.formRef.ngSubmit.emit();
  }

  resetForm() {
    if (this.buttons.resetForm) {
      this.form.reset();
    }
    this.secondaryBtnEvent.emit();
  }

  getFormValidationErrors() {
    const errors: any = [];
    Object.keys(this.form.controls).forEach(key => {
      var controlErrors: any = this.form.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          // console.log('Key control: ' + key + ', errKey: ' + keyError + ', errValue: ', controlErrors[keyError]);
          errors.push({key, errKey: keyError, errValue: controlErrors[keyError]})
        });
      }
    });
    this.errorsOnSubmitEvent.emit(errors);
  }

  setRequiredFlag(key: any, flag: any) {
    const req: any = flag ? Validators.required : undefined;
    this.form.controls[key].setValidators(req);
    this.form.controls[key].updateValueAndValidity();
  }

  updateFormProperty(key: any, parameter: any, value: any) {
    const field = this.fields.find(x => x.name === key);
    field[parameter] = value;
  }

  updateFormDefaultValue(key: string, value: any) {
    this.form.patchValue({
      [key]: value
    });
  }

  tertiaryBtnClick() {
    this.tertiaryBtnEvent.emit();
  }

}
