import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {
  Book,
  BookService,
} from '../../shared';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Array<Book>;
  category: string;
  searchValue: string;
  page: string;
  params: Array<object>
  noResultsFound: Boolean;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.params = Object.entries(params);
      this.getBooks();
  });
   }

  ngOnInit() {
    this.params = [];
    this.noResultsFound = false;
  }

  getBooks() {
    let params = '?';
    for( let param of this.params ) {
      params += param[0] + "=" + param[1] + "&"
    }
    this.bookService.getBooksList(params).subscribe(
      result => {
        if(result['status']  != "FAIL") {
          this.books = result['books'];
        }
        else {
          this.noResultsFound = true;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
