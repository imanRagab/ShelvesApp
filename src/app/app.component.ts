import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UserService } from './shared';
// declare var jquery:any;
// declare var $ :any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';

  constructor(
    private userService: UserService,
  ){
  }
  ngOnInit() {
    this.userService.populate();
  }
}
