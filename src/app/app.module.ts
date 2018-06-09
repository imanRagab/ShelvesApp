import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';


import {
  SharedModule
} from './shared';

import { HomeContentComponent } from './home-content/home-content.component';
import { FooterComponent } from './footer/footer.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
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
    SignInComponent,
    UserProfileComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule ,
    AuthModule,
    BookModule,
    MDBBootstrapModule.forRoot(),

  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
