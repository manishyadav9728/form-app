import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ValidatorTestComponent} from './validator-test/validator-test.component';

const routes: Routes = [
  {path: 'signUp', component: ValidatorTestComponent},
  {path: '', redirectTo: '/signUp', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
