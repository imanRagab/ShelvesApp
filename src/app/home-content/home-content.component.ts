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

  firstLatestBooks: Array<Book>;
  secondLatestBooks: Array<Book>;
  thirdLatestBooks: Array<Book>;
  constructor(
    private bookService: BookService
  ) { 

  }

  ngOnInit() {
  }

  // get latest books list
  getLatestBooks() {

    this.bookService.getLatest().subscribe(
      result => {
        result = result['data'];
          for(let i = 0; i < result.length; i++){
            if(i <= result.length/3)
              {
                this.firstLatestBooks.push(result[i]);
              }
            else if(i <= result.length*2/3)
              {

                this.secondLatestBooks.push(result[i]);
              }
            else
              {
                this.thirdLatestBooks.push(result[i]);
              }
          }
      },
      error => {

      }
    );
  }
}
