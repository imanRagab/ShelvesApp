import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Book } from '../models/book.model';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  // get book data
  getBook(id :number): Observable<Book> {
    const route = `/book/books/${id}`;
    return this.apiService.get(route);
  }

  // delete book
  deleteBook(id :number) {
    const route = `/book/books/${id}`;
    return this.apiService.delete(route);
  }

  // update book
  updateBook(book :object): Observable<Book> {
    const route = `/book/books/${book['id']}`;
    return this.apiService.put(route, {book: book});
  }

  //create book
  createBook(book :object): Observable<Book> {
    const route = `/book/books/`;
    return this.apiService.post(route, {book: book});
  }

  //get latest books
  getLatest(): Observable<Array<Book>> {
    const route = `/book/books/latest_books`;
    return this.apiService.get(route);
  }

  //get recommended books
  getRecommended(): Observable<Array<Book>> {
    const route = `/book/books/recommended_books`;
    return this.apiService.get(route);
  }

  // get books list
  getBooksList(params): Observable<Array<Book>> {
    const route = `/book/books/`;
    return this.apiService.get(route + params);
  }

  //updateBid For Book

  updateBidForBook(bookID,price): Observable<Book> {
    const route = `/book/books/${bookID}/update_bid`;
    return this.apiService.put(route, {price: price});
  }
}
