import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
<<<<<<< HEAD
<<<<<<< HEAD

import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';


import {
  SharedModule
} from './shared';

=======
=======
>>>>>>> 8e75aa2641c637403f7deca00788ea05dec8580a
import { HomeContentComponent } from './home-content/home-content.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
<<<<<<< HEAD
>>>>>>> 634c87b0305a09a785f0da096d9d2ad87870f60e
=======
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
>>>>>>> 8e75aa2641c637403f7deca00788ea05dec8580a
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavBarComponent,
    HomeContentComponent,
    FooterComponent,
    UserComponent,
    SignUpComponent,
<<<<<<< HEAD
    SignInComponent
=======
    SignInComponent,
    ForgetPasswordComponent
>>>>>>> 8e75aa2641c637403f7deca00788ea05dec8580a
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
<<<<<<< HEAD
    SharedModule ,
    AuthModule,
    BookModule   
=======
=======
>>>>>>> 8e75aa2641c637403f7deca00788ea05dec8580a
    MDBBootstrapModule.forRoot(),
    
    

<<<<<<< HEAD
>>>>>>> 634c87b0305a09a785f0da096d9d2ad87870f60e
=======
>>>>>>> 8e75aa2641c637403f7deca00788ea05dec8580a
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
