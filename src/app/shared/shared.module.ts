import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http-token-interceptor';

import {
    JwtService,
    ApiService
} from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    JwtService,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
