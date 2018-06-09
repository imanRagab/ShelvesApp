import { Component, OnInit } from '@angular/core';
import {
  Category,
  CategoryService
} from '../shared';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  firstCatArray: Array<Category>;
  secondCatArray: Array<Category>;
  thirdCatArray: Array<Category>;
  constructor(
    private categoryService: CategoryService,
  ) {
    this.firstCatArray = [];
    this.secondCatArray = []; 
    this.thirdCatArray = [];
   }

  ngOnInit() {
        // get list of book categories
        this.getCategories();
  }
    // get list of all categories
    getCategories() {
      this.categoryService.getCategories().subscribe(
        result => {
          result = result['data'];
          for(let i = 0; i < result.length; i++){
            if(i <= result.length/3)
              {
                this.firstCatArray.push(result[i]);
              }
            else if(i <= result.length*2/3)
              {

                this.secondCatArray.push(result[i]);
              }
            else
              {
                this.thirdCatArray.push(result[i]);
              }
          }
        },
        error => {
          console.log(error);
        }
      );
    }

}
