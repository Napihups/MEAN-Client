import { TestBed, inject } from '@angular/core/testing';

import { AppsocketService } from './appsocket.service';

describe('AppsocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppsocketService]
    });
  });

  it('should be created', inject([AppsocketService], (service: AppsocketService) => {
    expect(service).toBeTruthy();
  }));
});
