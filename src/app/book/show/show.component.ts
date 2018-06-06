import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Book,
  BookService,
  User,
  UserService
} from '../../shared';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  book: Book;
  currentUser: User;
  canModify: boolean;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {

    // get book id from url
    const book_id = parseInt(this.route.snapshot.paramMap.get('id'));

    // get book data
    this.bookService.getBook(book_id).subscribe(
      result => {
        this.book = result;
        console.log(this.book);
      },
      error => {
        console.log(error);
       }
    );

    // Load the current user's data
    this.userService.currentUser.subscribe(
      (userData: User) => {
        this.currentUser = userData;
        this.canModify = (this.currentUser.id === this.book.user.id);
      }
    );
  }

}
