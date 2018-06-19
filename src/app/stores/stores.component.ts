import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import {

  User,
  UserService,

} from '../shared';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {
  bookStores: Array<User>;
  bookStoreImage: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.bookStoreImage = `${environment.api_host}`;
    this.getAllBookStores();
  }

    //get all book stores
    getAllBookStores() {
      this.userService.getBookStores().subscribe(
        result => {
          if (result['status'] != 'FAIL') {
            this.bookStores = result['users'];
            console.log(this.bookStores);
            console.log(this.bookStoreImage);
  
          }
        },
        error => {
          console.log(error);
        }
      );
    }

}
