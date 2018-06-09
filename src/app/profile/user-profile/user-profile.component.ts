import { Component, OnInit } from '@angular/core';

import {
  User,
  UserService,
  Book,
} from '../../shared';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: User;
  userRole: string;
  userBooks: Array<Book>
  userLoggedIn: Boolean;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userLoggedIn = false;
    this.loadCurrentUser();
  }

  // Load the current user's data
  loadCurrentUser() {
    this.userService.currentUser.subscribe(
      (userData: User) => {
        if(userData.name){
          this.currentUser = userData;
          this.userLoggedIn = true;
          this.userRole = this.currentUser.role;
          this.loadUserBooks();
        }
      }
    );  
  }

  // Load user books data
  loadUserBooks() {
    this.userService.getUserBooks(this.currentUser.id).subscribe(
      result => {
        this.userBooks = result['books'];
      }, 
      error => {
        console.log(error);
      }
    );
  }

}
