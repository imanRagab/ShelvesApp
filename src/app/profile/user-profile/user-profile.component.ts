import { Component, OnInit } from '@angular/core';

import {
  User,
  UserService,
} from '../../shared';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

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
