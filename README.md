# Material Dynamic Form - Beta
---
The **material-dynamic-form** is an Angular 15 component that provides a HTML Form which loads JSON configuration.
The component is responsible for displaying the HTML Form, validation, error messages.
It supports Angular material fields and pre-build or custom themes.

## Prerequisites
---
This project requires NodeJS (version 16 or later) and NPM. Node and NPM are really easy to install. To 
make sure you have them available on your machine, try running the following command.

```sh
$ npm -v && node -v
8.15.0
v16.17.0
```
> This project was generated with Angular CLI version 15.0.4


## Install
---
To install the package, just run:

```sh
$ npm install material-dynamic-form
```


## Importing Modules
---
```sh
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialDynamicFormModule } from 'material-dynamic-form'; // <-- import it
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MaterialDynamicFormModule], // <-- and include it
  bootstrap: [AppComponent],
})
export class MyAppModule {}
```

## Demo
---
In Progress

## Usage
---
HTML

```sh
<material-dynamic-form 
  [fields]="demoAllFields.fields" 
  [buttons]="demoAllFields.buttons" 
  [submitted]="submitted"
  [validationError]="validationError" 
  (submitBtnEvent)="submitBtnEvent($event)"
>
</material-dynamic-form>
```

TS

```sh
  validationError: any = {};
  submitted: boolean = false;
  @ViewChild(MaterialDynamicFormComponent, { static: false })
  private dynamicFormComponent!: MaterialDynamicFormComponent;

  demoAllFields: any = {
    fields: [
      {
        type: 'header',
        label: 'Employee Registration Form',
        classes: "employee-form-header"
      },
      {
        type: 'text',
        name: 'firstName',
        label: 'First Name',
        default: '',
        validation: {
          required: true
        },
        appearance: 'fill',
        hint: 'hey',
        suffix: 'matSuffix', // matPrefix
        suffixIcon: 'sentiment_very_satisfied',
        alignPosition: 'end'
      },
      {
        type: 'password',
        name: 'password',
        label: `Enter Password`,
        default: '',
        validation: {
          required: true,
          min: 8,
          pattern: "[a-zA-Z0-9!@#$%\^&*)(+=._-]{4,}"
        }
      },
      {
        type: 'password',
        name: 'confirmPassword',
        label: `Enter Confirm Password`,
        default: '',
        validation: {
          required: true,
          min: 8,
          max: 12,
          pattern: "[a-zA-Z0-9!@#$%\^&*)(+=._-]{4,}"
        }
      },
      {
        type: 'textarea',
        name: 'address',
        label: `Address`,
        default: 'Mumbai, India',
        required: false
      },
      {
        type: 'checkbox',
        name: 'isActive',
        label: `Employee Status`,
        default: true,
        required: true
      },
    ],
    buttons: {
      display: true,
      align: 'center',
      primaryButton: true,
      primaryLabel: 'Submit',
      secondaryButton: true,
      secondaryLabel: 'Reset',
      resetForm: true,
      tertiaryButton: true,
      tertiaryLabel: 'Random'
    }
  }

  submitBtnEvent(event: any) {
    console.log(event);
  }
```


## License
---
MIT License


## Keywords
---
material dynamic basic form
