import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Observable } from 'rxjs';
import {Order} from '../models/order.model'
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

//get order data
getOrder(id :number): Observable<Order> {
  const route = `/book/orders/${id}/order`;
  return this.apiService.get(route);
}

//confirm exchange
confirm_exchange(id: number, book: number): Observable<any>
{
  const route = `/book/books/${id}/confirm_exchange`;
  return this.apiService.post(route,{book : book})
}

//dismiss exchange
dismiss_exchange(id: number): Observable<any>
{
//book/books/1/dismiss_exchange
const route = `/book/books/${id}/dismiss_exchange`
return  this.apiService.delete(route)
}
}
