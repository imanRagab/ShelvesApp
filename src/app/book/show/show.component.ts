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
  Reply,
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
  exchangeableBooks: Array<Book>;
  rateForm: FormGroup;
  orderForm: FormGroup;
  orderSellForm: FormGroup;

  error: string;
  message: string;
  orderFormErrors = {};
<<<<<<< HEAD
  comments: Array<Comment>;
  commentForm: FormGroup;
  comment: Object;
  reply: Object;
  commentError: string;
  replyError: string;
  replyForm: FormGroup;
=======
  myObject: Book
  exchange_order_id: number
  chosen_books = { "books": []}
>>>>>>> 73f3f12d45c901abe0d0aab2790accec7d66f206
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
    this.commentError = "";
    this.replyError = "";
    this.replyForm = this.fb.group({
      'reply':['',[
        Validators.required,
        Validators.minLength(2)
      ]]
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

//get exchangeable books
  getExchangeableBooks()
  {
    const wanted_book_id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.bookService.getExchangeableBooks(wanted_book_id).subscribe(
      data => {
        if(data['status'] == 'SUCCESS'){
          this.exchangeableBooks=data['exchangeable_books'];
          this.exchange_order_id=data['order_id'];
        }
        else{
          this.error = data['message']
        }
       
    },
      error => {
       
        this.router.navigateByUrl('/');
       
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
          this.commentError = result['message'];
        }else{
          this.commentError = "";
          this.comment = result["comment"];
          this.comments.splice(0,0,this.comment as Comment);
          this.commentForm.reset();
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

  // return all comments
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
        this.router.navigateByUrl(`/books/${book_id}`);
    },
      error => {
        alert("Couldn\'t create the comment!")
        this.router.navigateByUrl('/books/${book_id}');
         console.log(error);
      }
    );

  }

  // Create reply
  createReply(commentId: number) {
    const reply = this.replyForm.value;
    this.commentService
    .createReply(this.book.id,commentId,reply.reply)
    .subscribe(
      result => {
        console.log(result);
        if( result['status'] == 'FAIL' ) {
          this.replyError = result['message'];
        }else{
          this.replyError = "";
          this.reply = result["reply"];
          // push reply to it's comment
          this.comments
          .filter(Comment => Comment.id == commentId)[0]
          .replies.push(this.reply);
          this.replyForm.reset();
        }
        this.router.navigateByUrl(`/books/${this.book.id}`);
    },
      error => {
        alert("Couldn\'t create the reply!")
        this.router.navigateByUrl('/books/${this.book.id}');
        // console.log(error);
      }
    );
  }  

  // submit reply function create/update
  submitReply(commentId: number) {
    this.createReply(commentId);;
  }
  
 
  chooseBook(e , item: Book)
  {
    console.log(e.explicitOriginalTarget.checked)
    if(e.explicitOriginalTarget.checked){
     this.chosen_books.books.push({"id": item.id})
    }
    else{

     let index = this.chosen_books.books.indexOf(item.id);

     this.chosen_books.books.splice(index, 1);
    }
    console.log(this.chosen_books)
  }
  //send request for exchange
  requestExchange()
  {
    this.bookService.exchange_request(this.chosen_books,this.exchange_order_id).subscribe(
      data => {
        if(data['status'] == 'Success'){
          this.message=data['message']
        }
       
    },
      error => {
        console.log(error);
       }
    );
  }
  //order free Share 
  OrderFree()
  {
    this.bookService.requestFree(this.book.id).subscribe(

      result => {
        if( result['status'] == 'FAIL' ) {
          alert(result['message']) 
        }
        else {
          if( result['message'] ) {
           alert(result['message'])
           
          }
         
        }
    },
      error => {
        this.router.navigateByUrl('/');
      
      }
    );
  }
}
