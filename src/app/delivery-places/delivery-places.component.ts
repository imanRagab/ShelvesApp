import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
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
  constructor(private workSpaceService: WorkSpacesService) { }

  ngOnInit() {
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
              
            }
          },
          error => {
            console.log(error);
          }
        );
      }

}
