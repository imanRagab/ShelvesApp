import { Component, OnInit } from '@angular/core';

import {
  Book,
  BookService,
  User,
  UserService,
} from '../shared';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss']
})
export class HomeContentComponent implements OnInit {

  latestBooks: Array<Book>;
  recommendedBooks: Array<Book>;
  currentUser: User;
  userLoggedIn: Boolean;
  userHasInterests: Boolean;
  constructor(
    private bookService: BookService,
    private userService: UserService
  ) { 
  }

  ngOnInit() {

    this.userHasInterests = false;
    this.userLoggedIn = false;
    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        
        if(this.currentUser.name) {
          this.userLoggedIn = true;
          this.getRecommendedBooks();
        }
      }
    );   
    
    this.recommendedBooks = [];
    this.latestBooks = [];
    this.getLatestBooks();
  }

  // get latest books list
  getLatestBooks() {

    this.bookService.getLatest().subscribe(
      result => {
        if(result['status']  != 'FAIL'){
          this.latestBooks = result['books'];
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  // get recommended books
  getRecommendedBooks() {
    this.bookService.getRecommended().subscribe(
      result => {
        if(result['status']  != 'FAIL'){
          this.userHasInterests = true;
          for(let j = 0; j < result['books'].length; j++) {
            for(let i = 0; i < result['books'][j].length; i++){
              this.recommendedBooks.push(result['books'][j][i]);
            }
            this.shuffleRecommendedBooks();
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

    // shuffle recommended books --- using Fisher–Yates shuffle algorithm
    shuffleRecommendedBooks() {
      var m = this.recommendedBooks.length, temp, i;    
      while (m) {
        i = Math.floor(Math.random() * m--);
        temp = this.recommendedBooks[m];
        this.recommendedBooks[m] = this.recommendedBooks[i];
        this.recommendedBooks[i] = temp;
      }    
    }
}
