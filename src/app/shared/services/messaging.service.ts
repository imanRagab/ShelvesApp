import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class MessagingService {

  messaging = firebase.messaging()
  currentMessage = new BehaviorSubject(null)

  constructor(private db: AngularFireDatabase,
     private afAuth: AngularFireAuth, 
     private httpClient: HttpClient,
     private apiService: ApiService,
     private jwtService: JwtService
    ) { 

  
    }


  updateToken(token) {
    this.afAuth.authState.take(1).subscribe(user => {

      if (!user) return;
      const data = { [user.uid]: token }
      
      this.db.object('fcmTokens/').update(data)

      

    })
  }

  getPermission(currentUserID) {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log(token)

        //save notification token in database
        if (!localStorage.getItem('notification_token')) {
          this.savenotificationToken(token,currentUserID);
        }
        //update notification_token in database
        if (localStorage.getItem('notification_token')!=token) {
          console.log("update")
          this.updatenotificationToken(token,currentUserID);
        }

        this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      
      console.log("Message received. ", payload);
      this.currentMessage.next(payload)
    });
  }
  savenotificationToken(newToken,currentUserID) {
        this.httpClient.post(`http://localhost:3000/api/v1/notification/notification_tokens`,
        {
          token: newToken,
          user_id: currentUserID
        })
        .subscribe(
          (data: any) => {
            console.log(data);
          }
        )

      localStorage.setItem('notification_token', newToken);
  }
  updatenotificationToken(newToken,currentUserID) {
    
    const headers =  new HttpHeaders({
      'Content-Type': 'application/json',
        });

    this.httpClient.put(`http://localhost:3000/api/v1/notification/notification_tokens/`+localStorage.getItem('notification_token'),
      {
        token: newToken,
        user_id: currentUserID

      },{headers})
      .subscribe(
        (data: any) => {
          console.log(data);
        }
      )

      localStorage.setItem('notification_token', newToken);
  }


  //get all notification messages For login user
   getNotificationMessages(): Observable<Array<Notification>> {
    const route = `/notification/notification_messages/get_user_notifications`;
    return this.apiService.get(route);
  }


  //get no of unseen messages for login user

   getNoUnseenNotificationMessages(): Observable<Array<Notification>> {
    const route = `/notification/notification_messages/get_no_unseen_notification_messages`;
    return this.apiService.get(route);
  }
}