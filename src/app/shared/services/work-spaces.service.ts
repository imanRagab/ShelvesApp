import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { WorkSpace } from '../models/work_space.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WorkSpacesService {

  constructor(
    private apiService: ApiService,
  ) { }

  //get all work_spaces
  getWorkSpaces(): Observable<Array<WorkSpace>> {
    const route = `/work_space/work_spaces`;
    return this.apiService.get(route);
  }
}
