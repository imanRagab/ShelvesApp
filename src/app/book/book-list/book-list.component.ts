import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
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
  params: any;
  noResultsFound: Boolean;
  paginationMeta: object;
  currentPage: number;
  pages: Array<number>;
  totalPages: number;
  error: string;
  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.searchValue = '';
    this.category = '';
    this.route.queryParams.subscribe(params => {
        
        this.params = params;
        if(params['page'])
          this.currentPage = params['page'];
        else
          this.currentPage = 1;
        if(params['category'])
          this.category = params['category'];
        if(params['search'])
          this.searchValue = params['search'];
        this.getBooks();
      });
   }

  ngOnInit() {
    this.noResultsFound = false;
    this.paginationMeta = {};
    // this.currentPage = 1;
    this.totalPages = 0;
    this.error = '';
  }

  getBooks() {

    let paramsUrl = this.getUrlParams();
    this.bookService.getBooksList(paramsUrl).subscribe(
      result => {
        if(result['status']  != "FAIL") {
          this.books = result['books'];
          this.paginationMeta = result['meta']['pagination']
          this.totalPages = this.paginationMeta['total_pages'];
          this.pages = Array(this.totalPages).fill(0, 0, this.totalPages).map((x,i)=>i);
        }
        else {
          this.noResultsFound = true;
          this.error = result['message'];
        }
      },
      error => {
        console.log(error);
        this.noResultsFound = true;
      }
    );
  }

  getUrlParams() {

    let params = this.params;
    let paramsArray = Object.entries(params);
    let paramsUrl = '?';
    for( let param of paramsArray ) {
      paramsUrl += param[0] + "=" + param[1] + "&"
    }
    return paramsUrl;
  }

  pageClick(page) {

    let paramsUrl = `?page=${page}`;
    if(this.category)
      paramsUrl += `&category=${this.category}`

    if(this.searchValue)
      paramsUrl += `&search=${this.searchValue}`

      console.log(paramsUrl)
    this.router.navigateByUrl('/books' +  paramsUrl);
  }

}
