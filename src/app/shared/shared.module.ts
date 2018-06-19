import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http-token-interceptor';
import {OrderService} from './services/order.service'

import {
    JwtService,
    ApiService,
    UserService,
    BookService,
    CategoryService,
    MessagingService, 
    NoAuthGuardService,
    AuthGuardService,
    WorkSpacesService,
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
    OrderService,
    BookService,
    CategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    MessagingService,
    NoAuthGuardService,
    AuthGuardService,
    WorkSpacesService,
  ]
})
export class SharedModule { }
