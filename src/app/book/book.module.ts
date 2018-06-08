import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { CreateComponent } from './create/create.component';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ShowComponent, CreateComponent]
})
export class BookModule { }
