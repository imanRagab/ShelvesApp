import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private apiService: ApiService,
  ) { }

  //get books categories 
  getCategories(): Observable<Array<Category>> {
    const route = `/category/categories`;
    return this.apiService.get(route);
  }
}
