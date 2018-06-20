import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/services/order.service';
import {Order} from '../shared/models/order.model'
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Book,
  User,
  UserService,
  BookService
} from '../shared';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Order;
  currentUser: User;
  canView: boolean;
  userImage: Object;
  exchangeable_books: Array<Book>;
  exchangeable_book: number;
  orderConfirmed: boolean;
 
  confirmed: boolean;
  notConfirmed: boolean;
  message: string;
  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private route: ActivatedRoute,

    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userImage = {};
    this.exchangeable_books=[];
    this.message="";
    this.getOrder();
  }


getOrder()
{
//get order id from url
const order_id = parseInt(this.route.snapshot.paramMap.get('id'));
  this.orderService.getOrder(order_id).subscribe(
    result => {
      console.log(result)
      this.order = result['order'];
     
      if (this.order.state == "confirmed"){
      
        this.orderConfirmed = true;
      }else{
       
        this.orderConfirmed = false;
      }
      if (this.order.user[0].profile_picture['url'])
      {
        this.userImage['url'] = `${environment.api_host}` + this.order.user[0].profile_picture['url'];
      }else{
        this.userImage['url']=null;
      }
     
    console.log(this.order);
      // Load the current user's data
      this.userService.currentUser.subscribe(
        (userData: User) => {
          this.currentUser = userData;
          this.canView = (this.currentUser.id === this.order.seller[0].id);
        }
      );
      this.getExchangeable_books(this.order['exchangeable_books']);
    },
    error => {
      console.log(error);
     }
  );
}

getExchangeable_books(books: string){
  let arr = JSON.parse(books);
  let i=0
  for(i=0; i<arr.length; i++){
   this.bookService.getBook(arr[i].id).subscribe(
    result => {
      let newBook = result['book'];
      this.exchangeable_books.push(newBook)
      console.log(this.exchangeable_books);
    },
    error => {
      console.log(error);
     }
   );
 
// console.log(arr[i])//Object { id: 4 }
  }
}

//confirm 
confirmExOrder()
{
  let btn: any;
   btn = document.getElementsByName("exb");
   
  this.exchangeable_book =Number(btn[0].value)
  
  this.orderService.confirm_exchange(this.order.id,this.exchangeable_book).subscribe(


    data => {
      this.canView=false
      if(data['status'] == 'SUCCESS'){
        this.confirmed=true;
        
      }
      else{
        this.notConfirmed=true
      }
      this.message=data['message'];
      alert(this.message);
  }
  );
  this.router.navigateByUrl('/');
}
//dismiss
dismissEx()
{
  this.orderService.dismiss_exchange(this.order.id).subscribe(
    data =>{
      this.canView=false
      this.message=data['message'];
      alert(this.message);
    }
  );
  this.router.navigateByUrl('/');

}

//confirm sell order
confirmSellOrder(){
console.log(this.order.book[0].id);
this.orderService.confirmSell(this.order.book[0].id,this.order.id).subscribe(
  data =>{
    this.message=data['message'];
    console.log(this.message);
    setTimeout(() => 
    {
      this.router.navigateByUrl('/books/'+this.order.book[0].id);
    },
    4000);
  }
)
}

//dismiss sell order
dismissSellOrder(){
console.log("dismiss");

this.orderService.dismissSell(this.order.book[0].id,this.order.id).subscribe(
  data =>{
    this.message=data['message'];
    setTimeout(() => 
      {
        this.router.navigateByUrl('/books/'+this.order.book[0].id);
      },
      4000);
    console.log(this.message);
  }
)
}

}
