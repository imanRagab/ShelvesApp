import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Category,
  CategoryService,
  User,
  UserService,
  MessagingService
} from '../shared';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  firstCatArray: Array<Category>;
  secondCatArray: Array<Category>;
  thirdCatArray: Array<Category>;
  currentUser: User;
  userLoggedIn: Boolean;
  userNotifications: Array<Notification>;
  noUnseenNotifications: Number;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
    private messageService: MessagingService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.firstCatArray = [];
    this.secondCatArray = [];
    this.thirdCatArray = [];
    this.userNotifications = [];
    this.noUnseenNotifications = null;


    // get list of book categories
    this.getCategories();

    this.userLoggedIn = false;
    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        if (this.currentUser.name) {
          this.userLoggedIn = true;
          //this.getUnSeenNotifications();
          //this.getNotifications();
        }
      }
    );
    
  }
  // get list of all categories
  getCategories() {
    this.categoryService.getCategories().subscribe(
      result => {
        result = result['data'];
        for (let i = 0; i < result.length; i++) {
          if (i <= result.length / 3) {
            this.firstCatArray.push(result[i]);

          }
          else if (i <= result.length * 2 / 3) {

            this.secondCatArray.push(result[i]);
          }
          else {
            this.thirdCatArray.push(result[i]);

          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  //get all user notification messages
  getNotifications() {
    this.messageService.getNotificationMessages("navbar-notifications").subscribe(
      result => {
        if (result['status'] != 'FAIL') {
          this.userNotifications = result['notification_messages'];
          console.log(this.userNotifications);        }
      },
      error => {
        console.log(error);
      }
    );
  }


  //get no of unseen notification messages

  getUnSeenNotifications() {
    this.messageService.getNoUnseenNotificationMessages().subscribe(
      result => {
        if (result['status'] != 'FAIL') {
          this.noUnseenNotifications = result['no_unseen_notification_messages'];

        }
      },
      error => {
        console.log(error);
      }
    );
  }

  //Update Unseen Notifications Messages to be seen
  updateUnSennNotifications() {
    this.messageService.updateUnseenNotificationMessages().subscribe(
      result => {
        if (result['status'] != 'FAIL') {
          this.noUnseenNotifications = 0;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  // logout current user
  logout() {
    this.userService.purgeAuth();
  }
}
