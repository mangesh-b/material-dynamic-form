import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';

// Modules
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentUtcDateAdapter } from './directives/moment-utc-date-adapter';

// Directives
import { NumberDirective } from './directives/only-numbers';

// Components
import { MaterialDynamicFormComponent } from './material-dynamic-form.component';
import { DynamicComponent } from './dynamic/dynamic.component';

// form fields
import { FormInputTypeComponent } from './dynamic/atoms/input';
import { FormCheckboxTypeComponent } from './dynamic/atoms/checkbox';
import { FormDateTypeComponent } from './dynamic/atoms/date';
import { FormRadioTypeComponent } from './dynamic/atoms/radio';
import { FormSelectTypeComponent } from './dynamic/atoms/select';
import { FormTextareaTypeComponent } from './dynamic/atoms/textarea';
import { FormPasswordTypeComponent } from './dynamic/atoms/password';
import { FormCountrySelectTypeComponent } from './dynamic/atoms/countryselect';
import { FormGroupSelectTypeComponent } from './dynamic/atoms/groupselect';
import { FormNumberTypeComponent } from './dynamic/atoms/number';
// END


export const MY_FORMATS = {
  parse: {
    dateInput: 'yyyy-mm-dd',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    MaterialDynamicFormComponent,
    DynamicComponent,
    FormInputTypeComponent,
    FormCheckboxTypeComponent, FormTextareaTypeComponent, FormSelectTypeComponent,
    FormRadioTypeComponent, FormDateTypeComponent, FormPasswordTypeComponent,
    FormCountrySelectTypeComponent, FormGroupSelectTypeComponent, 
    FormNumberTypeComponent,
    DynamicComponent,
    NumberDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    MaterialDynamicFormComponent
  ],
  providers: [
  ]
})
export class MaterialDynamicFormModule { }