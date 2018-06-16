import { Component, OnInit } from '@angular/core';
import {
  User,
  UserService,
} from '../shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  userLoggedIn: Boolean;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userLoggedIn = false;
    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        if(this.currentUser.name) {
          this.userLoggedIn = true;
         
        }
      }
    );   
  }

}
