import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http-token-interceptor';

import {
    JwtService,
    ApiService,
    UserService,
    BookService,
    CategoryService,
    MessagingService,
   
     
} from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    HttpClient,
    JwtService,
    ApiService,
    UserService,
    BookService,
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    MessagingService 
  ]
})
export class SharedModule { }
