import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

import {
  User,
  UserService,
  Book,
} from '../../shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  currentUser: User;
  userLoggedIn: Boolean;
  userRole: string;
  userBooks: Array<Book>
  userImage: object;
  userAddresses: Array<string>;
  mySubscription: any;
  constructor(
    private userService: UserService,
  ) {
   }

  ngOnInit() {
    this.currentUser = <User>{};
    this.userImage = {};
    this.userAddresses = [];
    this.userLoggedIn = false;
    this.loadCurrentUser();
  }

  ngOnDestroy() {
    if (this.mySubscription)
     this.mySubscription.unsubscribe();
    }

  // Load the current user's data
  loadCurrentUser() {
    this.userService.currentUser.subscribe(
      (userData: User) => {
        if(userData.name){
          this.currentUser = userData;
          this.userLoggedIn = true;
          this.userRole = this.currentUser.role;
          this.userImage['url'] = `${environment.api_host}` + this.currentUser.profile_picture['url'];
          this.loadUserBooks();
          this.concatUserAddresses();
        }
      }
    );
  }

  // Load user books data
  loadUserBooks() {
    this.userService.getUserBooks(this.currentUser.id).subscribe(
      result => {
        this.userBooks = result['users'];
      }, 
      error => {
        console.log(error);
      }
    );
  }

  // concat user addresses
  concatUserAddresses() {
    for(let addresse of this.currentUser['addresses']){
      this.userAddresses.push(addresse['building_number'] + " " + addresse['street']
                                             + " st. " + addresse['city'] + ", " + addresse['region']);
    }
  }
}
