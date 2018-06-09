import { Component, OnInit } from '@angular/core';
import {
  User,
  UserService,
} from '../../shared';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  currentUser: User;
  userRole: string;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
        // Load the current user's data
        this.userService.currentUser.subscribe(
          (userData: User) => {
            this.currentUser = userData;
            this.userRole = this.currentUser.role;
          }
        );  
  }

}
