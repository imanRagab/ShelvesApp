import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared';
import { AppRoutingModule } from '../app-routing.module';
import { NewPasswordComponent } from './new-password/new-password.component';

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(), 
  ],
  declarations: [
    AuthComponent,
    NewPasswordComponent
  ],
  providers: [
  ]
})
export class AuthModule {}
