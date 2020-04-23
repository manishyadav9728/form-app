import { Directive } from '@angular/core';
import { ValidatorFn, FormControl, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import {formatDate} from '@angular/common';

formatDate(new Date(), 'yyyy/MM/dd', 'en');
@Directive({
  selector: '[appCustomeValidator]'
})
export class CustomeValidatorDirective {

  constructor() { }

}
export function customeValid() : ValidatorFn{
  return (control : AbstractControl) : {[key: string]: any} | null =>{
    var today = new Date()
    var x = control.value
    var dob = new Date(x)
    var cY = today.getFullYear()
    var dobY = dob.getFullYear()
    console.log(cY-dobY);
    const ret = (cY-dobY > 18)? null : {'invalid input':{key:control.value}}
    return ret;
  }
}
 export const equalTo : ValidatorFn = (formGroup : FormGroup) : ValidationErrors | null =>{
    return formGroup.controls.password.value === formGroup.controls.confirmPassword.value? null : {"NoMatchError" : {key : formGroup.controls.password.value}};
  }
 
