import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  similarBooks: Array<Book>;
  orderForm: FormGroup;
  orderFormErrors = {};
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.similarBooks = [];
    this.getBook();
    this.getSimilarBooks(); 
    this.orderForm = this.fb.group({
      'price': ['', [Validators.required, Validators.min(this.book.price)]]
    });
  }

  // get book data
  getBook() {
      // get book id from url
    const book_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBook(book_id).subscribe(
      result => {
        this.book = result['book'];
        console.log(this.book)
        // Load the current user's data
        this.userService.currentUser.subscribe(
          (userData: User) => {
            this.currentUser = userData;
            this.canModify = (this.currentUser.id === this.book.user[0].id);
          }
        );
      },
      error => {
        console.log(error);
       }
    );   
  }

  getSimilarBooks() {
  }

  updateBidPrice(){

  }
  // submit order form
  submitOrder() {
    console.log("sd");
    console.log(this.orderForm.value);
 
   

   // this.updateBidPrice();

  
  }
}
