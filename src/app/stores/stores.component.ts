import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

import {

  User,
  UserService,

} from '../shared';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss']
})
export class StoresComponent implements OnInit {

  bookStores: Array<User>;
  bookStoreImage: any;
  paginationMeta: object;
  currentPage: number;
  pages: Array<number>;
  totalPages: number;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router

  ) { 
    this.route.queryParams.subscribe(params => {        
      if(params['page'])
        this.currentPage = parseInt(params['page']);
      else
        this.currentPage = 1;
    });
  }

  ngOnInit() {
    this.paginationMeta = {};
    this.totalPages = 0;
    this.bookStoreImage = `${environment.api_host}`;
    this.getAllBookStores();
  }

    //get all book stores
    getAllBookStores() {
      this.userService.getBookStores().subscribe(
        result => {
          if (result['status'] != 'FAIL') {
            this.bookStores = result['users']; 
            this.paginationMeta = result['meta']['pagination']
            this.totalPages = this.paginationMeta['total_pages'];
            this.pages = Array(this.totalPages).fill(0, 0, this.totalPages).map((x,i)=>i);
          }
        },
        error => {
          console.log(error);
        }
      );
    }

    pageClick(page) {

      let paramsUrl = `?page=${page}`;
      this.router.navigateByUrl('/stores' +  paramsUrl);
    }

}
