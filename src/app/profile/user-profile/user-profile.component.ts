import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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

  profileUser: User;
  userLoggedIn: Boolean;
  currentUser: User;
  userRole: string;
  userBooks: Array<Book>
  userImage: object;
  mySubscription: any;
  userId: number;
  rateVal: number;
  error: string;
  message: string;
  apiHost: string;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      // get user id from url
      this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit() {
    this.apiHost = environment.api_host;
    this.error="";
    this.message="";
    this.profileUser = <User>{};
    this.currentUser = <User>{};
    this.userImage = {};
    this.userLoggedIn = false;
    this.loadProfileUser();
  }

  ngOnDestroy() {
    if (this.mySubscription)
     this.mySubscription.unsubscribe();
    }

  // Load the user's data
  loadProfileUser() {
    if(!this.userId) {
      this.userService.currentUser.subscribe(
        (userData: User) => {
          if(userData.name){
            this.profileUser = userData;
            this.userLoggedIn = true;
            this.userRole = this.profileUser.role;
            this.userImage['url'] = `${environment.api_host}` + this.profileUser.profile_picture['url'];
            this.loadUserBooks();
          }
        }
      ); 
    }
    else {
      this.userService.currentUser.subscribe(
        (userData: User) => {
          if(userData.name){
            this.currentUser = userData;
            if(this.currentUser.id == this.userId) // profile of current user
              this.router.navigateByUrl('/userprofile');
            else {

              // profile of another user 
              this.userService.getUserProfile(this.userId).subscribe(
                result => {
                  this.profileUser = result['user'];
                  this.profileUser.phone = result['phones'][0];
                  this.profileUser.addresse = result['addresses'][0];
                  this.profileUser.interests = result['interests'];
                  this.userImage['url'] = `${environment.api_host}` + this.profileUser.profile_picture['url'];
                  this.userRole = this.profileUser.role;
                  this.loadUserBooks();  
                }
              );
            }
          }
        }
      );    
    }
  }

  // Load user books data
  loadUserBooks() {
    this.userService.getUserBooks(this.profileUser.id).subscribe(
      result => {
        this.userBooks = result['users'];
      }, 
      error => {
        console.log(error);
      }
    );
  }

  //add rate to user
  submitRate(){
    console.log(this.rateVal);
    let rate = this.rateVal;
    this.userService
    .addRate(this.userId,rate)
    .subscribe(
      result => {
        console.log(result);
        if( result['status'] == 'FAIL' ) {
          this.error = result['message']
        }
        else {
          if( result['message'] ) {
            this.message = result['message']
           this.rateVal= null;
          }
         
        }
    },
      error => {
         console.log(error);
      }
    );
  }
}
