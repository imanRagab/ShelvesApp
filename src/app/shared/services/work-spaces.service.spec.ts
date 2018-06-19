import { TestBed, inject } from '@angular/core/testing';

import { WorkSpacesService } from './work-spaces.service';

describe('WorkSpacesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkSpacesService]
    });
  });

  it('should be created', inject([WorkSpacesService], (service: WorkSpacesService) => {
    expect(service).toBeTruthy();
  }));
});
