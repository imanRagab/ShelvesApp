import { Component, OnInit } from '@angular/core';
import {
  MessagingService
} from '../../shared';
@Component({
  selector: 'app-show-notifications',
  templateUrl: './show-notifications.component.html',
  styleUrls: ['./show-notifications.component.scss']
})
export class ShowNotificationsComponent implements OnInit {
  userNotifications: Array<Notification>;
  constructor(
    private messageService:  MessagingService
  ) { }

  ngOnInit() {
    this.userNotifications = [];
    this.getNotifications(); 
    this.updateUnSennNotifications();
  }

   //get all user notification messages
   getNotifications(){
    this.messageService.getNotificationMessages("show-notifications").subscribe(
      result => {
        if(result['status']  != 'FAIL'){
          this.userNotifications = result['notification_messages'];
          
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
          console.log(result['message']);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
