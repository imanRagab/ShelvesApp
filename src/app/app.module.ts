import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule ,
    AuthModule,
    BookModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
