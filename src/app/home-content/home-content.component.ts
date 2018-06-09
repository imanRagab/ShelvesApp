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
  constructor(
    private bookService: BookService
  ) { 

  }

  ngOnInit() {
    this.getLatestBooks();
  }

  // get latest books list
  getLatestBooks() {

    this.bookService.getLatest().subscribe(
      result => {
        console.log(result)
        result = result['books'];
        console.log(result[0]['book_images'][0]['image'].url)
        this.latestBooks = result;
      },
      error => {
        console.log(error);
      }
    );
  }
}
