import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { MessagingService } from './messaging.service';
import { User, Book } from '../models';
import { map } from 'rxjs/operators/';
import { distinctUntilChanged } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();
  message;
  constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private messagingService: MessagingService
  ) {}

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.get('/user/users')
      .subscribe(
        data => {
          data.user.phone = data.phones[0];
          data.user.addresse = data.addresses[0];
          data.user.interests = data.interests;
          this.setAuth(data.user);
        },
        err => this.purgeAuth()
      );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  setAuth(user: User, token = this.jwtService.getToken()) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '/signup';
    return this.apiService.post('/user/users' + route, credentials)
      .pipe(map(
      data => {
        if(data.status == "SUCCESS"){
          if( type === 'login' ) {
            data.user.phone = data.phones[0];
            data.user.addresse = data.addresses[0];
            data.user.interests = data.interests;
            this.setAuth(data.user, data.auth_token);
            this.messagingService.getPermission(this.getCurrentUser().id);
            this.messagingService.receiveMessage();
            this.message = this.messagingService.currentMessage;
            this.messagingService.savenotificationToken(localStorage.getItem('notification_token'),this.getCurrentUser().id);
          }
        }
        return data;
      }
    ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  // Update the user on the server (email, pass, etc)
  update(user, id): Observable<User> {
    const route = `/user/users/${id}`;
    return this.apiService
    .put(route, user)
    .pipe(map(data => {
      // Update the currentUser observable
      // this.currentUserSubject.next(data.user);
      this.populate();
      // return data.user;
      return this.getCurrentUser();
    }));
  }

  // reset password 
  resetPassword(resetForm): Observable<any> {    
    const route = `/user/password_resets`;
    return this.apiService.post(route, resetForm);
  }

  // create new password
  newPassword(resetToken, newPasswordForm): Observable<any> {
    const route = `/user/password_resets/${resetToken}`;
    return this.apiService.put(route, newPasswordForm);
  }

  // get user profile data
  getUserProfile(id): Observable<User> {
    const route = `/user/users/${id}`;
    return this.apiService.get(route);
  }
  // get user books
  getUserBooks(id: number): Observable<Array<Book>>{
    const route = `/user/users/${id}/get_user_books`;
    return this.apiService.get(route);
  }  

   //add rate on a user
   addRate(userID,rate): Observable<Book> {
    const route = `/user/users/${userID}/user_rates`;
    return this.apiService.post(route, {rate: rate});
  }

  //get all book stores
  getBookStores(): Observable<User> {
    const route = `/user/users/get_all_book_stores`;
    return this.apiService.get(route);
  }

  // confirm user email
  confirmEmail(id): Observable<any> {
    const route = `/user/users/${id}/confirm_email`
    return this.apiService.get(route);
  }
}
