import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShowComponent, EditComponent]
})
export class ProfileModule { }
