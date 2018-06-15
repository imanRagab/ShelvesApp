import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RatingModule} from 'primeng/rating';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { ProfileModule } from './profile/profile.module';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule }     from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from './../environments/environment';

import {
  SharedModule
} from './shared';

import { HomeContentComponent } from './home-content/home-content.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavBarComponent,
    HomeContentComponent,
    FooterComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    RatingModule,
    SharedModule,
    RouterModule,
    AppRoutingModule,
    SharedModule ,
    AuthModule,
    BookModule,
    ProfileModule,
    MDBBootstrapModule.forRoot(),

  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
