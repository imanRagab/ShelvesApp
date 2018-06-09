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
  constructor(
    private bookService: BookService
  ) { 
  }

  ngOnInit() {
    this.recommendedBooks = [];
    this.latestBooks = [];
    this.getLatestBooks();
    this.getRecommendedBooks();
  }

  // get latest books list
  getLatestBooks() {

    this.bookService.getLatest().subscribe(
      result => {
        this.latestBooks = result['books'];
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
        for(let j = 0; j < result['books'].length; j++) {
          for(let i = 0; i < result['books'][j].length; i++){
            this.recommendedBooks.push(result['books'][j][i]);
          }
        }
        this.shuffleRecommendedBooks();
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
