import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Book,
  BookService,
  User,
  UserService,
  Comment,
  CommentService,
} from '../../shared';


@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  rateVal: number;
  book: Book;
  currentUser: User;
  canModify: boolean;
  similarBooks: Array<Book>;
  rateForm: FormGroup;
  orderForm: FormGroup;
  orderSellForm: FormGroup;
  error: string;
  message: string;
  orderFormErrors = {};
  comments: Array<Comment>;
  commentForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private commentService: CommentService,
  ) { }

  ngOnInit() {

    this.error = "";
    this.message= "";
    this.similarBooks = [];
    this.getBook();
    this.getSimilarBooks(); 
    this.orderForm = this.fb.group({
      'price': ['', [Validators.required]]
    });
    this.orderSellForm = this.fb.group({
      'quantity': ['', [Validators.required]]
    });
    this.comments = [];
    this.commentForm = this.fb.group({
      'comment': ['', [
        Validators.required,
        Validators.minLength(2),
      ]]
    });
    this.showComments();
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

//order book for sell by bids
  updateBidPrice(){
    let price = this.orderForm.value.price;
    this.bookService
    .updateBidForBook(this.book.id,price)
    .subscribe(
      result => {
        console.log(result);
        if( result['status'] == 'FAIL' ) {
          this.error = result['message']
        }
        else {
          if( result['message'] ) {
            this.message = result['message']
           
          }
         
        }
    },
      error => {
        alert("Couldn\'t make Bid on this Book")
        this.router.navigateByUrl('/');
         console.log(error);
      }
    );
  }

  //order book for Sell 
   
  orderBookForSell(){
    let quantity = this.orderSellForm.value.quantity;
    this.bookService
    .orderToSellBook(this.book.id,quantity)
    .subscribe(
      result => {
        console.log(result);
        if( result['status'] == 'FAIL' ) {
          this.error = result['message']
        }
        else {
          if( result['message'] ) {
            this.message = result['message']
           
          }
         
        }
    },
      error => {
        alert("Couldn\'t make Bid on this Book")
        this.router.navigateByUrl('/');
         console.log(error);
      }
    );
  }

  
  // submit order form
  submitOrder() {
    console.log(this.book.transcation);
    if (this.book.transcation == "Sell By Bids")
    {
      this.updateBidPrice();
    }else if (this.book.transcation == "Sell")
    {
      this.orderBookForSell();
    }  
        
  }

  //submit rate value
  submitRate(){
    console.log(this.rateVal);
    let rate = this.rateVal;
    this.bookService
    .addRate(this.book.id,rate)
    .subscribe(
      result => {
        console.log(result);
        if( result['status'] == 'FAIL' ) {
          this.error = result['message']
        }
        else {
          if( result['message'] ) {
            this.message = result['message']
           this.rateVal= null;
          }
         
        }
    },
      error => {
        alert("Couldn\'t add rate on this Book")
        this.router.navigateByUrl('/');
         console.log(error);
      }
    );
  }

  reload(){
    location.reload()
  }
  // Create comment
  createComment() {
    const comment = this.commentForm.value;
    this.commentService
    .createComment(this.book.id,comment.comment)
    .subscribe(
      result => {
        console.log(result);
        if( result['status'] == 'FAIL' ) {
          this.error = result['message']
        }
        this.router.navigateByUrl(`/books/${this.book.id}`);
    },
      error => {
        alert("Couldn\'t create the comment!")
        this.router.navigateByUrl('/books/${this.book.id}');
        // console.log(error);
      }
    );
  }

  // submit comment function create/update
  submitComment() {
    this.createComment();

  }
  showComments(){
    const book_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.commentService
    .showComments(book_id)
    .subscribe(
      result => {
        console.log(result);
        for(let i = 0; i < result['comments'].length; i++){
          this.comments.push(result['comments'][i]);
        }
        console.log(this.comments);
        this.router.navigateByUrl(`/books/${this.book.id}`);
    },
      error => {
        alert("Couldn\'t create the comment!")
        this.router.navigateByUrl('/books/${this.book.id}');
         console.log(error);
      }
    );

  }
 
}
