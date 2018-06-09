import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UserProfileComponent, EditProfileComponent]
})
export class ProfileModule { }
