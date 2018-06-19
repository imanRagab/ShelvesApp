import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

import {
  WorkSpacesService,
} from '../shared';
import { WorkSpace } from '../shared/models/work_space.model';
@Component({
  selector: 'app-delivery-places',
  templateUrl: './delivery-places.component.html',
  styleUrls: ['./delivery-places.component.scss']
})
export class DeliveryPlacesComponent implements OnInit {
  workSpaces: Array<WorkSpace>;
  workSpaceImage: any;
  paginationMeta: object;
  currentPage: number;
  pages: Array<number>;
  totalPages: number;
  constructor(
    private workSpaceService: WorkSpacesService,
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
    this.workSpaceImage = `${environment.api_host}`;
    this.getAllWorkSpaces();
  }

      //get all book stores
      getAllWorkSpaces() {
        this.workSpaceService.getWorkSpaces().subscribe(
          result => {
            if (result['status'] != 'FAIL') {
              this.workSpaces = result['work_spaces'];
              console.log(this.workSpaces);
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
        this.router.navigateByUrl('/DeliveryPlaces' +  paramsUrl);
      }

}
