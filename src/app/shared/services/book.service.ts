import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Book } from '../models/book.model';
import { HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

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
    const route = `/api/books/${id}`;
    return this.apiService.get(route);
  }

  // delete book
  deleteBook(id :number) {
    const route = `/api/books/${id}`;
    return this.apiService.delete(route);
  }

  // update book
  updateBook(book :Book): Observable<Book> {
    const route = `/api/books/${book.id}`;
    return this.apiService.put(route, book);
  }

  //create book
  createBook(book :Book): Observable<Book> {
    const route = `/api/books`;
    return this.apiService.post(route, book);
  }

  //get latest books
  getLatest(): Observable<Array<Book>> {
    const route = `/api/books/latest_books`;
    return this.apiService.post(route);
  }

  //get recommended books
  getRecommended(): Observable<Array<Book>> {
    const route = `/api/books/recommended_books`;
    return this.apiService.post(route);
  }
}
