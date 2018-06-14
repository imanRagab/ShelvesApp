import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(
    private apiService: ApiService,
  ) { }

  getCities(): Observable<any> {
    const route = `/user/users/cites`
    return this.apiService.get(route);
  }
}
