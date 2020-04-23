import { Component, OnInit } from '@angular/core';
import {FormGroup,  FormBuilder, Validators} from '@angular/forms';
import {customeValid} from '../custome-validator.directive'
import {TestApiService} from '../test-api.service'
import {Location} from '@angular/common';
import {FormData} from '../form-data';
import {Country} from '../country';
@Component({
  selector: 'app-validator-test',
  templateUrl: './validator-test.component.html',
  styleUrls: ['./validator-test.component.css']
})
export class ValidatorTestComponent implements OnInit {
  constructor(private fb : FormBuilder, private location: Location, private service : TestApiService) {
    const currentYear = new Date().getFullYear();
   }
  countryCode = "";
  country : string = "india";
  countries : Country[] ;
  passwordChecker(group : FormGroup){
    let p = group.controls.password.value;
    let cp = group.controls.confirmPassword.value;
    //console.warn(p===cp);
    return p===cp?null:{'notMatching' : true};
  }
  phoneChecker(group: FormGroup){
    const country = group.controls.country.value;
    const phone = group.controls.phone.value;   
    if(country){
      console.log(country);
      let regex = new RegExp(country.regex);
      console.log(regex);
      return (regex.test(phone)?null: {'Invalid Country Phone': true})
    }
  }

  phoneError = true;
  countryError = true;
  confirmPasswordError = true;
  passwordError = true;
  emailError = true;
  lastNameError = true;
  firstNameError = true;
  captchaError=true;
  dobError=true;

  password_grp = this.fb.group({
    password : ['',[Validators.required,Validators.minLength(8),Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
    confirmPassword : ['',[Validators.required,Validators.minLength(8)]]
  }, {validator : this.passwordChecker});

  cg = this.fb.group({
    country : ['',Validators.required],
    phone : ['',Validators.required]
  },{validator: this.phoneChecker});

  formGroup = this.fb.group({
    firstName : ['',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/),Validators.minLength(4)]],
    lastName : ['',[Validators.required,Validators.pattern(/^[a-zA-Z]+$/),Validators.minLength(4)]],
    email : ['',[Validators.required,Validators.email]],
    passwordGroup : this.password_grp,
    countryGroup : this.cg,
    dob : ['',customeValid()]
  });

  onChange(){
    const country = this.cg.get('country').value;
    this.countryCode = '+'+country.country_code;
    
  }

  submit(){
    this.firstNameError = this.formGroup.get('firstName').valid;
    this.lastNameError = this.formGroup.get('lastName').valid;
    this.emailError = this.formGroup.get('email').valid;
    this.passwordError = this.password_grp.get('password').valid;
    this.confirmPasswordError = this.password_grp.valid;
    this.countryError = this.cg.controls['country'].valid;
    this.phoneError = this.cg.valid;
    this.dobError = this.formGroup.get("dob").valid;

    if(this.formGroup.valid){
      this.service.setData(new FormData(this.formGroup.get('firstName').value, 
      this.formGroup.get('lastName').value, 
      this.formGroup.get('email').value, 
      this.password_grp.get('password').value, 
      this.cg.controls['country'].value.country_id, 
      this.cg.get('phone').value)).subscribe(x => console.log(x));
    }
  }

  goback(){
    this.location.back();
  }

  ngOnInit() {
    this.service.getCountry().subscribe(countries => {this.countries = countries; console.log(this.countries)});
  }

}
