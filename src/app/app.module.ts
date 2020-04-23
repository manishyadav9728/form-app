import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidatorTestComponent } from './validator-test/validator-test.component';
import { CustomeValidatorDirective } from './custome-validator.directive';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common'
import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';



@NgModule({
  declarations: [
    AppComponent,
    ValidatorTestComponent,
    CustomeValidatorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatNativeDateModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
